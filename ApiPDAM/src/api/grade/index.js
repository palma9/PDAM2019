import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, createMany, index, update, destroy } from './controller'
import { schema } from './model'
export Grade, { schema } from './model'

const router = new Router()
const { name } = schema.tree

/**
 * @api {post} /grades Create grade
 * @apiName CreateGrade
 * @apiGroup Grade
 * @apiPermission schoolManager
 * @apiParam {String} access_token schoolManager access token.
 * @apiParam name Grade's name.
 * @apiSuccess {Object} grade Grade's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Grade not found.
 * @apiError 401 schoolManager access only.
 */
router.post('/',
  token({ required: true, roles: ['schoolManager'] }),
  body({ name }),
  create)

/**
 * @api {post} /grades/many Create grades array
 * @apiName CreateManyGrades
 * @apiGroup Grade
 * @apiPermission schoolManager
 * @apiParam {String} access_token schoolManager access token.
 * @apiParam name Grade's array names.
 * @apiSuccess {Object} grade Grade's array data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Grade not found.
 * @apiError 401 schoolManager access only.
 */
router.post('/many',
  token({ required: true, roles: ['schoolManager'] }),
  body([{ name }]),
  createMany)

/**
 * @api {get} /grades Retrieve grades
 * @apiName RetrieveGrades
 * @apiGroup Grade
 * @apiPermission schoolManager
 * @apiParam {String} access_token schoolManager access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of grades.
 * @apiSuccess {Object[]} rows List of grades.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 schoolManager access only.
 */
router.get('/',
  token({ required: true, roles: ['schoolManager'] }),
  query(),
  index)

/**
 * @api {put} /grades/:id Update grade
 * @apiName UpdateGrade
 * @apiGroup Grade
 * @apiPermission schoolManager
 * @apiParam {String} access_token schoolManager access token.
 * @apiParam name Grade's name.
 * @apiSuccess {Object} grade Grade's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Grade not found.
 * @apiError 401 schoolManager access only.
 */
router.put('/:id',
  token({ required: true, roles: ['schoolManager'] }),
  body({ name }),
  update)

/**
 * @api {delete} /grades/:id Delete grade
 * @apiName DeleteGrade
 * @apiGroup Grade
 * @apiPermission schoolManager
 * @apiParam {String} access_token schoolManager access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Grade not found.
 * @apiError 401 schoolManager access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['schoolManager'] }),
  destroy)

export default router
