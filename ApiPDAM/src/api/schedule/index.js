import { middleware as body } from 'bodymen';
import { Router } from 'express';
import { middleware as query, Schema } from 'querymen';

import { token } from '../../services/passport';
import { create, createMany, index, dailySchedule, oneDayIndex, update, destroy } from './controller';
import { schema } from './model';

export Schedule, { schema } from './model'

const router = new Router()
const { timeInterval, dayOfWeek, room, subject, teacher } = schema.tree

const schedulesSchema = new Schema({
  filter: {
    type: String,
    paths: ['teacher', 'room', 'subject']
  }
})

/**
 * @api {post} /schedules Create schedule
 * @apiName CreateSchedule
 * @apiGroup Schedule
 * @apiPermission schoolManager
 * @apiParam {String} access_token schoolManager access token.
 * @apiParam timeInterval Schedule's timeInterval.
 * @apiParam dayOfWeek Schedule's dayOfWeek.
 * @apiParam room Schedule's room.
 * @apiParam subject Schedule's subject.
 * @apiParam teacher Schedule's teacher.
 * @apiSuccess {Object} schedule Schedule's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Schedule not found.
 * @apiError 401 schoolManager access only.
 */
router.post('/',
  token({ required: true, roles: ['schoolManager'] }),
  body({ timeInterval, dayOfWeek, room, subject, teacher }),
  create)

/**
 * @api {post} /schedules/many Create schedule array
 * @apiName CreateManySchedules
 * @apiGroup Schedule
 * @apiPermission schoolManager
 * @apiParam {String} access_token schoolManager access token.
 * @apiParam timeInterval Schedule's timeIntervals.
 * @apiParam dayOfWeek Schedule's dayOfWeeks.
 * @apiParam room Schedule's rooms.
 * @apiParam subject Schedule's subjects.
 * @apiParam teacher Schedule's teachers.
 * @apiSuccess {Object} schedule Schedule's array data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Schedule not found.
 * @apiError 401 schoolManager access only.
 */
router.post('/many',
  token({ required: true, roles: ['schoolManager'] }),
  body([{ timeInterval, dayOfWeek, room, subject, teacher }]),
  createMany)

/**
 * @api {get} /schedules Retrieve schedules
 * @apiName RetrieveSchedules
 * @apiGroup Schedule
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of schedules.
 * @apiSuccess {Object[]} rows List of schedules.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true, roles: ['schoolManager', 'teacher'] }),
  query(schedulesSchema),
  index)

/**
 * @api {get} /schedules/oneday Retrieve schedules
 * @apiName RetrieveFreeSchedulesOfADay
 * @apiGroup Schedule
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of schedules.
 * @apiSuccess {Object[]} rows List of schedules.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/oneday',
  token({ required: true, roles: ['schoolManager', 'teacher'] }),
  oneDayIndex)

/**
 * @api {get} /schedules/daily Retrieve schedules
 * @apiName RetrieveDailySchedules
 * @apiGroup Schedule
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of schedules.
 * @apiSuccess {Object[]} rows List of schedules.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/daily',
  token({ required: true, roles: ['schoolManager', 'teacher'] }),
  dailySchedule)

/**
 * @api {put} /schedules/:id Update schedule
 * @apiName UpdateSchedule
 * @apiGroup Schedule
 * @apiPermission schoolManager
 * @apiParam {String} access_token schoolManager access token.
 * @apiParam timeInterval Schedule's timeInterval.
 * @apiParam dayOfWeek Schedule's dayOfWeek.
 * @apiParam room Schedule's room.
 * @apiParam subject Schedule's subject.
 * @apiParam teacher Schedule's teacher.
 * @apiSuccess {Object} schedule Schedule's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Schedule not found.
 * @apiError 401 schoolManager access only.
 */
router.put('/:id',
  token({ required: true, roles: ['schoolManager'] }),
  body({ timeInterval, dayOfWeek, room, subject, teacher }),
  update)

/**
 * @api {delete} /schedules/:id Delete schedule
 * @apiName DeleteSchedule
 * @apiGroup Schedule
 * @apiPermission schoolManager
 * @apiParam {String} access_token schoolManager access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Schedule not found.
 * @apiError 401 schoolManager access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['schoolManager'] }),
  destroy)

export default router
