import _ from 'lodash';

import { Schedule } from '.';
import { notFound, success } from '../../services/response/';
import { Substitution } from '../substitution';

export const create = ({ bodymen: { body } }, res, next) =>
  Schedule.create(body)
    .then((schedule) => schedule.view(true))
    .then(success(res, 201))
    .catch(next)

export const createMany = ({ body }, res, next) =>
  Schedule.insertMany(body)
    .then((schedules) => ({
      count: Object.keys(schedules).length,
      rows: schedules.map((schedule) => schedule.view())
    }))
    .then(success(res))
    .catch(next)

export const index = ({ querymen: { query, select, cursor }, user }, res, next) => {
  if (_.isEmpty(query)) query.teacher = user.id;
  Schedule.count(query)
    .then(count => Schedule.find(query, select, cursor)
      .populate('room', 'classNumber').populate('teacher', 'name')
      .populate({ path: 'subject', select: 'name', populate: ({ path: 'grade', select: 'name' }) })
      .then((schedules) => ({
        count,
        rows: schedules.map((schedule) => schedule.view())
      }))
    )
    .then(success(res))
    .catch(next)
}

export const dailySchedule = ({ query, user }, res, next) => {
  if (query.teacher == null) query.teacher = user.id;
  if (query.weekday == null) query.weekday = new Date().getDay();
  Schedule.count({ dayOfWeek: query.weekday, teacher: query.teacher })
    .then(count => Schedule.find({ dayOfWeek: query.weekday, teacher: query.teacher }, null, { sort: { timeInterval: 1 } })
      .populate('room', 'classNumber').populate('teacher', 'name')
      .populate({ path: 'subject', select: 'name', populate: ({ path: 'grade', select: 'name' }) })
      .then(schedules => ({
        count,
        rows: schedules.map(schedule => schedule.view())
      }))
    )
    .then(success(res))
    .catch(next)
}

export const oneDayIndex = ({ query, user }, res, next) => {
  let s = [];
  if (_.isEmpty(query))
    query.teacher = user.id;

  Schedule.find({ teacher: query.teacher, dayOfWeek: Number(query.weekday) })
    .populate('room', 'classNumber').populate('teacher', 'name')
    .populate({ path: 'subject', select: 'name', populate: ({ path: 'grade', select: 'name' }) })
    .then((schedules) => {
      s = schedules;
      return schedules.map((schedule) => schedule.id)
    })
    .then((schedule_ids) =>
      Substitution.find({ date: query.date, schedule: { $in: schedule_ids } }, { _id: 0, schedule: 1 })
        .then((horasASustituir) => res.json(s.filter((current) => horasASustituir.filter((other) => other.schedule == current.id).length == 0)))
        .catch(next)
    ).catch(next)
}

export const update = ({ bodymen: { body }, params }, res, next) =>
  Schedule.findById(params.id)
    .then(notFound(res))
    .then((schedule) => schedule ? Object.assign(schedule, body).save() : null)
    .then((schedule) => schedule ? schedule.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Schedule.findById(params.id)
    .then(notFound(res))
    .then((schedule) => schedule ? schedule.remove() : null)
    .then(success(res, 204))
    .catch(next)