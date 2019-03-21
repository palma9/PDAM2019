import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, createMany, index, update, destroy } from './controller'
import { schema } from './model'
export Room, { schema } from './model'

const router = new Router()
const { classNumber } = schema.tree

/**
 * @api {post} /rooms Create room
 * @apiName CreateRoom
 * @apiGroup Room
 * @apiPermission schoolManager
 * @apiParam {String} access_token schoolManager access token.
 * @apiParam classNumber Room's classNumber.
 * @apiSuccess {Object} room Room's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Room not found.
 * @apiError 401 schoolManager access only.
 */
router.post('/',
  token({ required: true, roles: ['schoolManager'] }),
  body({ classNumber }),
  create)

/**
* @api {post} /rooms/many Create rooms array
* @apiName CreateManyRooms
* @apiGroup Room
* @apiPermission schoolManager
* @apiParam {String} access_token schoolManager access token.
* @apiParam classNumber Room's array classNumbers.
* @apiSuccess {Object} room Room's array data.
* @apiError {Object} 400 Some parameters may contain invalid values.
* @apiError 404 Rooms not found.
* @apiError 401 schoolManager access only.
*/
router.post('/many',
  token({ required: true, roles: ['schoolManager'] }),
  body([{ classNumber }]),
  createMany)

/**
 * @api {get} /rooms Retrieve rooms
 * @apiName RetrieveRooms
 * @apiGroup Room
 * @apiPermission schoolManager
 * @apiParam {String} access_token schoolManager access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of rooms.
 * @apiSuccess {Object[]} rows List of rooms.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 schoolManager access only.
 */
router.get('/',
  token({ required: true, roles: ['schoolManager'] }),
  query(),
  index)

/**
 * @api {put} /rooms/:id Update room
 * @apiName UpdateRoom
 * @apiGroup Room
 * @apiPermission schoolManager
 * @apiParam {String} access_token schoolManager access token.
 * @apiParam classNumber Room's classNumber.
 * @apiSuccess {Object} room Room's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Room not found.
 * @apiError 401 schoolManager access only.
 */
router.put('/:id',
  token({ required: true, roles: ['schoolManager'] }),
  body({ classNumber }),
  update)

/**
 * @api {delete} /rooms/:id Delete room
 * @apiName DeleteRoom
 * @apiGroup Room
 * @apiPermission schoolManager
 * @apiParam {String} access_token schoolManager access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Room not found.
 * @apiError 401 schoolManager access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['schoolManager'] }),
  destroy)

export default router
