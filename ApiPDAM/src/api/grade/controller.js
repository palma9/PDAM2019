import { success, notFound } from '../../services/response/'
import { Grade } from '.'
import mongoose from 'mongoose'

export const create = ({ bodymen: { body }, user }, res, next) => {
  body.school = user.school;
  Grade.create(body)
    .then((grade) => grade.view(true))
    .then(success(res, 201))
    .catch(next)
}

export const createMany = ({ body, user }, res, next) => {
  body.forEach(element => {
    element.school = user.school;
  });
  Grade.create(body)
    .then((grades) => ({
      count: Object.keys(grades).length,
      rows: grades.map((grade) => grade.view())
    }))
    .then(success(res, 201))
    .catch(next)
}

export const index = ({ querymen: { query, select, cursor }, user }, res, next) => {
  query.school = user.school;
  Grade.count(query)
    .then(count => Grade.find(query, select, cursor)
      .then((grades) => ({
        count,
        rows: grades.map((grade) => grade.view())
      }))
    )
    .then(success(res))
    .catch(next)
}

export const update = ({ bodymen: { body }, params, user }, res, next) =>
  Grade.findOne({ _id: mongoose.Types.ObjectId(params.id), school: user.school })
    .then(notFound(res))
    .then((grade) => grade ? Object.assign(grade, body).save() : null)
    .then((grade) => grade ? grade.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params, user }, res, next) =>
  Grade.findOne({ _id: mongoose.Types.ObjectId(params.id), school: user.school })
    .then(notFound(res))
    .then((grade) => grade ? grade.remove() : null)
    .then(success(res, 204))
    .catch(next)
