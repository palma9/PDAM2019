import { success, notFound } from '../../services/response/'
import { User } from '.'
import { sign } from '../../services/jwt'
import { secCode } from '../../config'

const uploadService = require('../../services/upload/')

export const create = ({ bodymen: { body } }, res, next) => {
  if (body.securityCode != secCode) {
    res.send(401);
  } else {
    body.role = 'admin';
    User.create(body)
      .then(user => {
        sign(user.id)
          .then((token) => ({ token, user: user.view(true) }))
          .then(success(res, 201))
      })
      .catch((err) => {
        /* istanbul ignore else */
        if (err.name === 'MongoError' && err.code === 11000) {
          res.status(409).json({
            valid: false,
            param: 'email',
            message: 'email already registered'
          })
        } else {
          next(err)
        }
      })
  }
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  User.count(query)
    .then(count => User.find(query, select, cursor)
      .then(users => ({
        rows: users.map((user) => user.view()),
        count
      }))
    )
    .then(success(res))
    .catch(next)

export const showMe = ({ user }, res) =>
  res.json(user.view(true))

export const uploadPicture = ({ params, file }, res, next) =>
  uploadService.uploadFromBinary(file.buffer)
    .then(json => ({ picture: json.data.link }))
    .then(body =>
      User.findById(params.id)
        .then(user => body ? Object.assign(user, body).save() : null)
    )
    .then((user) => user.view(true))
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params, user }, res, next) =>
  User.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then((result) => {
      if (!result) return null
      const isAdmin = user.role === 'admin'
      const isManager = user.role === 'schoolManager'
      const isSelfUpdate = user.id === result.id
      if (!isSelfUpdate && !isAdmin && !isManager) {
        res.status(401).json({
          valid: false,
          message: 'You can\'t change other user\'s data'
        })
        return null
      }
      return result
    })
    .then((user) => user ? Object.assign(user, body).save() : null)
    .then((user) => user ? user.view(true) : null)
    .then(success(res))
    .catch(next)

export const updatePassword = ({ bodymen: { body }, params, user }, res, next) =>
  User.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then((result) => {
      if (!result) return null
      const isSelfUpdate = user.id === result.id
      if (!isSelfUpdate) {
        res.status(401).json({
          valid: false,
          param: 'password',
          message: 'You can\'t change other user\'s password'
        })
        return null
      }
      return result
    })
    .then((user) => user ? user.set({ password: body.password }).save() : null)
    .then((user) => user ? user.view(true) : null)
    .then(success(res))
    .catch(next)
