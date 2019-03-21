import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token, master } from '../../services/passport'
import { createTeacher, createSchoolManager, createMany, index, getGuardTeachers, destroy } from './controller'
import { schema } from './model'
export Teacher, { schema } from './model'

const router = new Router()
const { email, password, name, picture, number, school } = schema.tree

/**
 * @api {post} /teachers Create teacher
 * @apiName CreateTeacher
 * @apiGroup Teacher
 * @apiPermission schoolManager
 * @apiParam {String} access_token schoolManager access token.
 * @apiParam number Teacher's number.
 * @apiParam email Teacher's email.
 * @apiParam password Teacher's password.
 * @apiParam name Teacher's name.
 * @apiParam picture Teacher's picture.
 * @apiSuccess {Object} teacher Teacher's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Teacher not found.
 * @apiError 401 schoolManager access only.
 */
router.post('/',
  token({ required: true, roles: ['schoolManager'] }),
  body({ email, name, picture, number }),
  createTeacher)

/**
 * @api {post} /teachers/schoolManager Create School Manager
 * @apiName CreateSchoolManager
 * @apiGroup Teacher
 * @apiPermission Master
 * @apiParam {String} access_token master access token.
 * @apiParam number Teacher's number.
 * @apiParam email Teacher's email.
 * @apiParam password Teacher's password.
 * @apiParam name Teacher's name.
 * @apiParam picture Teacher's picture.
 * @apiParam school Teacher's school.
 * @apiSuccess {Object} teacher Teacher's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Teacher not found.
 * @apiError 401 master access only.
 */
router.post('/schoolManager',
  master(),
  body({ email, password, name, picture, number, school }),
  createSchoolManager)

/**
 * @api {post} /teachers/many Create teacher array
 * @apiName CreateManyTeachers
 * @apiGroup Teacher
 * @apiPermission schoolManager
 * @apiParam {String} access_token schoolManager access token.
 * @apiParam number Teacher's number.
 * @apiParam email Teacher's email.
 * @apiParam password Teacher's password.
 * @apiParam name Teacher's name.
 * @apiParam picture Teacher's picture.
 * @apiSuccess {Object} teacher Teacher's array data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Teacher many not found.
 * @apiError 401 schoolManager access only.
 */
router.post('/many',
  token({ required: true, roles: ['schoolManager'] }),
  body([{ email, name, picture, number }]),
  createMany)

/**
 * @api {get} /teachers Retrieve teachers
 * @apiName RetrieveTeachers
 * @apiGroup Teacher
 * @apiPermission schoolManager
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of teachers in school Manager's school.
 * @apiSuccess {Object[]} rows List of teachers in school Manager's school.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 schoolManager access only.
 */
router.get('/',
  token({ required: true, roles: ['schoolManager'] }),
  query(),
  index)

/**
 * @api {get} /teachers/guards Retrieve teachers on guard
 * @apiName RetrieveGuardTeachers
 * @apiGroup Teacher
 * @apiPermission schoolManager
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of teachers in school Manager's on guard school.
 * @apiSuccess {Object[]} rows List of teachers in school Manager's on guard school.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 schoolManager access only.
 */
router.get('/guard',
  token({ required: true, roles: ['schoolManager'] }),
  getGuardTeachers)

/**
 * @api {delete} /teachers/:id Delete teacher
 * @apiName DeleteTeacher
 * @apiGroup Teacher
 * @apiPermission schoolManager
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Teacher not found.
 * @apiError 401 schoolManager access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['schoolManager'] }),
  destroy)

export default router
