import { Router } from 'express'
import { middleware as query, Schema } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, absence, index, indexAll, indexEmpty, update, destroy, makepdf } from './controller'
import { schema } from './model'
export Substitution, { schema } from './model'

const router = new Router()
const { date, schedule, newTeacher } = schema.tree
const substitutionSchema = new Schema({
  date: {
    type: Date,
    paths: ['date'],
    operator: '$eq',
    default: new Date().setHours(0, 0, 0, 0)
  },
  newTeacher: {
    type: String,
    paths: ['newTeacher'],
    default: 'me'
  }
})
/**
 * @api {post} /substitutions Create substitution
 * @apiName CreateSubstitution
 * @apiGroup Substitution
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam date Substitution's date.
 * @apiParam schedule Substitution's schedule.
 * @apiParam newTeacher Substitution's newTeacher.
 * @apiSuccess {Object} substitution Substitution's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Substitution not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ date, schedule, newTeacher }),
  create)

/**
 * @api {post} /substitutions/absence Create teacher absence
 * @apiName CreateAbsence
 * @apiGroup Substitution
 * @apiPermission schoolManager
 * @apiParam {String} access_token schoolManager access token.
 * @apiParam date Absence's date.
 * @apiParam schedule Absence's schedule.
 * @apiSuccess {Object} Absence Absence's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Substitution not found.
 * @apiError 401 schoolManager access only.
 */
router.post('/absence',
  token({ required: true, roles: ['schoolManager'] }),
  body({ date, schedule }),
  absence)

/**
 * @api {get} /substitutions Retrieve one day substitutions
 * @apiName RetrieveSubstitutions
 * @apiGroup Substitution
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of substitutions.
 * @apiSuccess {Object[]} rows List of substitutions.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true, roles: ['schoolManager', 'teacher'] }),
  query(substitutionSchema),
  index)

/**
 * @api {get} /substitutions/all Retrieve all day substitutions
 * @apiName RetrieveAllSubstitutions
 * @apiGroup Substitution
 * @apiPermission schoolManager
 * @apiParam {String} access_token schoolManager access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of substitutions.
 * @apiSuccess {Object[]} rows List of substitutions.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 schoolManager access only.
 */
router.get('/all',
  token({ required: true, roles: ['schoolManager'] }),
  query({date: { type: Date, paths: ['date'], operator: '$eq', default: new Date().setHours(0, 0, 0, 0)}}),
  indexAll)

/**
 * @api {get} /substitutions/empty Retrieve substitutions without teacher
 * @apiName RetrieveEmptySubstitutions
 * @apiGroup Substitution
 * @apiPermission schoolManager
 * @apiParam {String} access_token schoolManager access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of substitutions.
 * @apiSuccess {Object[]} rows List of substitutions.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 schoolManager access only.
 */
router.get('/empty',
  token({ required: true, roles: ['schoolManager'] }),
  query({ date: { type: Date, paths: ['date'], operator: '$gte', default: new Date().setHours(0, 0, 0, 0) }}),
  indexEmpty)

/**
 * @api {get} /substitutions/makepdf Retrieve pdf of substitutions
 * @apiName RetrieveSubstitutionsPDF
 * @apiGroup Substitution
 * @apiPermission schoolManager
 * @apiParam {String} access_token schoolManager access token.
 * @apiUse listParams
 * @apiSuccess {File} PDF with all day substitutions.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 schoolManager access only.
 */
router.get('/makepdf',
  token({ required: true, roles: ['schoolManager'] }),
  query({ date: { type: Date, paths: ['date'], operator: '$eq', default: new Date().setHours(0, 0, 0, 0)}}),
  makepdf)


/**
 * @api {put} /substitutions/setguardteacher/:id set guard teacher to a substitution
 * @apiName UpdateSubstituteTeacher
 * @apiGroup Substitution
 * @apiPermission schoolManager
 * @apiParam {String} access_token schoolManager access token.
 * @apiParam newTeacher Substitution's newTeacher.
 * @apiSuccess {Object} substitution Substitution's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Substitution not found.
 * @apiError 401 schoolManager access only.
 */
router.put('/setguardteacher/:id',
  token({ required: true, roles: ['schoolManager'] }),
  body({ newTeacher }),
  update)

/**
 * @api {put} /substitutions/:id Update substitution
 * @apiName UpdateSubstitution
 * @apiGroup Substitution
 * @apiPermission schoolManager
 * @apiParam {String} access_token schoolManager access token.
 * @apiParam date Substitution's date.
 * @apiParam schedule Substitution's schedule.
 * @apiParam newTeacher Substitution's newTeacher.
 * @apiSuccess {Object} substitution Substitution's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Substitution not found.
 * @apiError 401 schoolManager access only.
 */
router.put('/:id',
  token({ required: true, roles: ['schoolManager'] }),
  body({ date, schedule, newTeacher }),
  update)

/**
 * @api {delete} /substitutions/:id Delete substitution
 * @apiName DeleteSubstitution
 * @apiGroup Substitution
 * @apiPermission schoolManager
 * @apiParam {String} access_token schoolManager access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Substitution not found.
 * @apiError 401 schoolManager access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['schoolManager'] }),
  destroy)

export default router
