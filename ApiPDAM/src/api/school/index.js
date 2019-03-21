import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, update, destroy } from './controller'
import { schema } from './model'
export School, { schema } from './model'

const router = new Router()
const { name, subscriptionEnd, contact, address, city, country } = schema.tree

/**
 * @api {post} /schools Create school
 * @apiName CreateSchool
 * @apiGroup School
 * @apiPermission admin, schoolManager
 * @apiParam {String} access_token admin or schoolManager access token.
 * @apiParam name School's name.
 * @apiParam contact School's contact.
 * @apiParam address School's address.
 * @apiParam city School's city.
 * @apiParam country School's country.
 * @apiSuccess {Object} school School's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 School not found.
 * @apiError 401 admin and schoolManager access only.
 */
router.post('/',
  token({ required: true, roles: ['admin', 'schoolManager'] }),
  body({ name, contact, address, city, country }),
  create)

/**
 * @api {get} /schools Retrieve schools
 * @apiName RetrieveSchools
 * @apiGroup School
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of schools.
 * @apiSuccess {Object[]} rows List of schools.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {put} /schools/:id Update school
 * @apiName UpdateSchool
 * @apiGroup School
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name School's name.
 * @apiParam subscriptionEnd School's subscriptionEnd.
 * @apiParam contact School's contact.
 * @apiParam address School's address.
 * @apiParam city School's city.
 * @apiParam country School's country.
 * @apiSuccess {Object} school School's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 School not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ name, subscriptionEnd, contact, address, city, country }),
  update)

/**
 * @api {delete} /schools/:id Delete school
 * @apiName DeleteSchool
 * @apiGroup School
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 School not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
