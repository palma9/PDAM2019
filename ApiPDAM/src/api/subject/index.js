import { Router } from 'express'
import { middleware as query, Schema } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, createMany, index, update, destroy } from './controller'
import { schema } from './model'
export Subject, { schema } from './model'

const router = new Router()
const { name, grade } = schema.tree

const subjectSchema = new Schema({
  filter: {
    type: String,
    paths: ['grade']
  },
})

/**
 * @api {post} /subjects Create subject
 * @apiName CreateSubject
 * @apiGroup Subject
 * @apiPermission schoolManager
 * @apiParam {String} access_token schoolManager access token.
 * @apiParam name Subject's name.
 * @apiParam grade Subject's grade.
 * @apiSuccess {Object} subject Subject's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Subject not found.
 * @apiError 401 schoolManager access only.
 */
router.post('/',
  token({ required: true, roles: ['schoolManager'] }),
  body({ name, grade }),
  create)

/**
 * @api {post} /subjects/many Create subject array
 * @apiName CreateManySubject
 * @apiGroup Subject
 * @apiPermission schoolManager
 * @apiParam {String} access_token schoolManager access token.
 * @apiParam name Subject's name.
 * @apiParam grade Subject's grade.
 * @apiSuccess {Object} subject Subject's data array.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Subject not found.
 * @apiError 401 schoolManager access only.
 */
router.post('/many',
  token({ required: true, roles: ['schoolManager'] }),
  body([{ name, grade }]),
  createMany)

/**
 * @api {get} /subjects Retrieve subjects
 * @apiName RetrieveSubjects
 * @apiGroup Subject
 * @apiPermission schoolManager
 * @apiParam {String} access_token schoolManager access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of subjects.
 * @apiSuccess {Object[]} rows List of subjects.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true, roles: ['schoolManager'] }),
  query(subjectSchema),
  index)

/**
 * @api {put} /subjects/:id Update subject
 * @apiName UpdateSubject
 * @apiGroup Subject
 * @apiPermission schoolManager
 * @apiParam {String} access_token schoolManager access token.
 * @apiParam name Subject's name.
 * @apiSuccess {Object} subject Subject's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Subject not found.
 * @apiError 401 schoolManager access only.
 */
router.put('/:id',
  token({ required: true, roles: ['schoolManager'] }),
  body({ name, grade }),
  update)

/**
 * @api {delete} /subjects/:id Delete subject
 * @apiName DeleteSubject
 * @apiGroup Subject
 * @apiPermission schoolManager
 * @apiParam {String} access_token schoolManager access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Subject not found.
 * @apiError 401 schoolManager access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['schoolManager'] }),
  destroy)

export default router
