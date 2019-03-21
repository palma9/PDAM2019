import { Router } from 'express'
import user from './user'
import auth from './auth'
import teacher from './teacher'
import school from './school'
import grade from './grade'
import subject from './subject'
import room from './room'
import schedule from './schedule'
import substitution from './substitution'

const router = new Router()

/**
 * @apiDefine master Master access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine admin Admin access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine user User access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine listParams
 * @apiParam {String} [q] Query to search.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 * @apiParam {String[]} [fields] Fields to be returned.
 */
router.use('/users', user)
router.use('/auth', auth)
router.use('/teachers', teacher)
router.use('/schools', school)
router.use('/grades', grade)
router.use('/subjects', subject)
router.use('/rooms', room)
router.use('/schedules', schedule)
router.use('/substitutions', substitution)

export default router
