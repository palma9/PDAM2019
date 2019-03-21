import { success, notFound } from '../../services/response/'
import { Subject } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Subject.create(body)
    .then((subject) => subject.view(true))
    .then(success(res, 201))
    .catch(next)

export const createMany = ({ body }, res, next) => {
  Subject.insertMany(body)
    .then((subjects) => ({
      count: Object.keys(subjects).length,
      rows: subjects.map((subject) => subject.view())
    }))
    .then(success(res, 201))
    .catch(next)
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Subject.count(query)
    .then(count => Subject.find(query, select, cursor).populate('grade', 'name school')
      .then((subjects) => ({
        count,
        rows: subjects.map((subject) => subject.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Subject.findById(params.id)
    .then(notFound(res))
    .then((subject) => subject ? Object.assign(subject, body).save() : null)
    .then((subject) => subject ? subject.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Subject.findById(params.id)
    .then(notFound(res))
    .then((subject) => subject ? subject.remove() : null)
    .then(success(res, 204))
    .catch(next)
