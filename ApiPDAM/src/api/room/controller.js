import { success, notFound } from '../../services/response/'
import { Room } from '.'
import mongoose from 'mongoose'

export const create = ({ bodymen: { body }, user }, res, next) => {
  body.school = user.school;
  Room.create(body)
    .then((room) => room.view(true))
    .then(success(res, 201))
    .catch(next)
}

export const createMany = ({ body, user }, res, next) => {
  body.forEach(element => {
    element.school = user.school;
  });
  Room.insertMany(body)
    .then((rooms) => ({
      count: Object.keys(rooms).length,
      rows: rooms.map((room) => room.view())
    }))
    .then(success(res))
    .catch(next)
}


export const index = ({ querymen: { query, select, cursor }, user }, res, next) => {
  query.school = user.school;
  Room.count(query)
    .then(count => Room.find(query, select, cursor)
      .then((rooms) => ({
        count,
        rows: rooms.map((room) => room.view())
      }))
    )
    .then(success(res))
    .catch(next)
}

export const update = ({ bodymen: { body }, params, user }, res, next) =>
  Room.findOne({ _id: mongoose.Types.ObjectId(params.id), school: user.school })
    .then(notFound(res))
    .then((room) => room ? Object.assign(room, body).save() : null)
    .then((room) => room ? room.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params, user }, res, next) =>
  Room.findOne({ _id: mongoose.Types.ObjectId(params.id), school: user.school })
    .then(notFound(res))
    .then((room) => room ? room.remove() : null)
    .then(success(res, 204))
    .catch(next)
