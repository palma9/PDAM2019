import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

import { Teacher } from '.';
import { env } from '../../config';
import { sign } from '../../services/jwt';
import { notFound, success } from '../../services/response/';
import { Schedule } from '../schedule';
import { Subject } from '../subject';
import { Substitution } from '../substitution';



export const createTeacher = ({ bodymen: { body }, user }, res, next) => {
  body.school = user.school;
  let newPass = body.name.toLowerCase();
  body.password = newPass.replace(/\s+/g, '');
  Teacher.create(body)
    .then((teacher) => teacher.view(true))
    .then(success(res, 201))
    .catch(next)
}

export const createSchoolManager = ({ bodymen: { body } }, res, next) => {
  body.role = 'schoolManager';
  Teacher.create(body)
    .then((teacher) => {
      sign(teacher.id)
        .then((token) => ({ token, user: teacher.view(true) }))
        .then(success(res, 201))
    })
    .catch(next)
}

export const createMany = ({ body, user }, res, next) => {
  body.forEach(e => {
    e.school = user.school;
    e.password = e.name.toLowerCase().replace(/\s+/g, '');
    Teacher.create(e)
      .then((teacher) => teacher.view(true))
      .then(success(res, 201))
      .catch(next)
  })
}

export const index = ({ querymen: { query, select, cursor }, user }, res, next) => {
  query.school = user.school;
  Teacher.count(query)
    .then(count => Teacher.find(query, select, cursor)
      .then((teachers) => ({
        count,
        rows: teachers.map((teacher) => teacher.view())
      }))
    )
    .then(success(res))
    .catch(next)
}

export const getGuardTeachers = ({ query }, res, next) => {
  const weekday = new Date(query.date).getDay();
  if (query.date == null || query.timeInterval == null) {
    res.send(400);
  }
  let listaProfesores = [];
  Subject.findOne({ name: 'Guardia' })
    .then(subject => Schedule.find({ dayOfWeek: weekday, timeInterval: query.timeInterval, subject: subject.id })
      .populate('teacher', 'name')
      .then(schedules => schedules.map(schedule => {
        listaProfesores.push(schedule.teacher);
        return schedule.teacher.id
      }))
    ).then((teacher_ids) =>
      Substitution.find({ date: query.date, newTeacher: { $in: teacher_ids } })
        .then(horasSustituyendo => listaProfesores.filter((current) => horasSustituyendo.filter((other) => other.newTeacher == current.id).length == 0))
        .then(profesLibres => profesLibres.map(profeLibre => profeLibre.view()))
        .then(success(res))
    ).catch(next)
}

export const destroy = ({ params, user }, res, next) =>
  Teacher.findOne({ _id: mongoose.Types.ObjectId(params.id), school: user.school })
    .then(notFound(res))
    .then((teacher) => teacher ? teacher.remove() : null)
    .then(success(res, 204))
    .catch(next)