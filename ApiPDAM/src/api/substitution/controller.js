import { Substitution } from '.';
import { generatePdf, generatePdfContent } from '../../services/pdf/pdfMaker';
import { notFound, success } from '../../services/response/';
import { Schedule } from '../schedule';
import { Teacher } from '../teacher'

export const create = ({ bodymen: { body } }, res, next) => {
  Schedule.findById(body.schedule)
    .then(async r => {
      if (r != null && r.dayOfWeek == body.date.getDay()) {
        Substitution.create(body)
          .then((substitution) => substitution.view(true))
          .then(success(res, 201))
          .catch(next)
      } else {
        res.send(400);
      }
    })
}

export const absence = ({ body }, res, next) => {
  let schedules = [];
  body.schedule.forEach(sc => schedules.push({ date: body.date, schedule: sc }));
  Substitution.insertMany(schedules)
    .then((substitutions) => {
      Schedule.findById(body.schedule[0]).then(sc => Teacher.findByIdAndUpdate( sc.teacher , {$addToSet: {substituted: body.date }}, {new : true}))
      return substitutions
    })
    .then((substitutions) => ({
      count: Object.keys(substitutions).length,
      rows: substitutions.map((substitution) => substitution.view())
    }))
    .then(success(res))
    .catch(next)
}

export const index = ({ querymen: { query, select, cursor }, user }, res, next) => {
  if (query.newTeacher === 'me')
    query.newTeacher = user.id;
  Substitution.count(query)
    .then(count => Substitution.find(query, select, cursor)
      .populate('newTeacher', 'name')
      .populate({
        path: 'schedule', populate: ([
          { path: 'subject', select: 'name', populate: ({ path: 'grade', select: 'name' }) },
          { path: 'room', select: 'classNumber' },
          { path: 'teacher', select: 'name' }
        ])
      })
      .then((substitutions) => ({
        count,
        rows: substitutions.map((substitution) => substitution.view())
      }))
    )
    .then(success(res))
    .catch(next)
}

export const indexAll = ({ querymen: { query, select, cursor } }, res, next) =>
  Substitution.count({ newTeacher: { $ne: null }, date: query['date'] })
    .then(count => Substitution.find({ newTeacher: { $ne: null }, date: query['date'] }, select, cursor)
      .populate('newTeacher', 'name')
      .populate({
        path: 'schedule', populate: ([
          { path: 'subject', select: 'name', populate: ({ path: 'grade', select: 'name' }) },
          { path: 'room', select: 'classNumber' },
          { path: 'teacher', select: 'name' }
        ])
      })
      .then((substitutions) => ({
        count,
        rows: substitutions.map((substitution) => substitution.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const indexEmpty = ({ querymen: { query, select, cursor }, }, res, next) => {
  Substitution.count({ newTeacher: null, date: query.date })
    .then(count => Substitution.find({ newTeacher: null, date: query.date }, select, cursor)
      .populate({
        path: 'schedule', populate: ([
          { path: 'subject', select: 'name', populate: ({ path: 'grade', select: 'name' }) },
          { path: 'room', select: 'classNumber' },
          { path: 'teacher', select: 'name' }
        ])
      })
      .then((substitutions) => ({
        count,
        rows: substitutions.map((substitution) => substitution.view())
      }))
    )
    .then(success(res))
    .catch(next)
}

export const update = ({ bodymen: { body }, params }, res, next) =>
  Substitution.findById(params.id)
    .populate({
      path: 'schedule', populate: ([
        { path: 'subject', select: 'name', populate: ({ path: 'grade', select: 'name' }) },
        { path: 'room', select: 'classNumber' },
        { path: 'teacher', select: 'name' }
      ])
    })
    .then(notFound(res))
    .then((substitution) => substitution ? Object.assign(substitution, body).save() : null)
    .then((substitution) => substitution ? substitution.view(true) : null)
    .then(async (substitution) => {     
      await Teacher.findByIdAndUpdate( body.newTeacher , {$inc: {substitutionsDone: 1 }}, {new : true})
      return substitution
    })
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Substitution.findById(params.id)
    .then(notFound(res))
    .then((substitution) => substitution ? substitution.remove() : null)
    .then(success(res, 204))
    .catch(next)


export const makepdf = ({ querymen: { query }, }, res, next) =>
  Substitution.find({ date: query['date'] }, null, { sort: { 'schedule.timeInterval': 1 } })
    .populate('newTeacher', 'name')
    .populate({
      path: 'schedule', populate: ([
        { path: 'subject', select: 'name', populate: ({ path: 'grade', select: 'name' }) },
        { path: 'room', select: 'classNumber' },
        { path: 'teacher', select: 'name' }
      ])
    })
    .then((substitutions) => substitutions.map((substitution) => {
      if (substitution.newTeacher != null) {
        return ({
          hora: substitution.schedule.timeInterval,
          curso: substitution.schedule.subject.grade.name,
          profesor: substitution.schedule.teacher.name,
          nuevoProfesor: substitution.newTeacher.name
        })
      } else {
        return ({
          hora: substitution.schedule.timeInterval,
          curso: substitution.schedule.subject.grade.name,
          profesor: substitution.schedule.teacher.name,
          nuevoProfesor: 'Voluntario'
        })
      }
    }
    ))
    .then(subs => generatePdfContent(subs))
    .then((pdfContent) => generatePdf(pdfContent, (response) => {
      res.setHeader('Content-Type', 'application/pdf');
      res.send(response)
    }))