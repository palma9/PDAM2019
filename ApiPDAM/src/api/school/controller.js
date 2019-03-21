import { success, notFound } from '../../services/response/'
import { School } from '.'

export const create = ({ bodymen: { body }, user }, res, next) => {
  const today = new Date();
  body.subscriptionEnd = today.setDate(today.getDate() + 30);
  if (user.role == 'schoolManager' && user.school != null) {
    res.send(401);
  } else if (user.role == 'schoolManager' && user.school == null) {
    School.create(body)
      .then((school) => { user.school = school; Object.assign(user, user).save(); return school; })
      .then((school) => school.view(true))
      .then(success(res, 201))
      .catch(next)
  } else {
    School.create(body)
      .then((school) => school.view(true))
      .then(success(res, 201))
      .catch(next)
    }
  }
export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  School.count(query)
    .then(count => School.find(query, select, cursor)
      .then((schools) => ({
        count,
        rows: schools.map((school) => school.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  School.findById(params.id)
    .then(notFound(res))
    .then((school) => school ? Object.assign(school, body).save() : null)
    .then((school) => school ? school.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  School.findById(params.id)
    .then(notFound(res))
    .then((school) => school ? school.remove() : null)
    .then(success(res, 204))
    .catch(next)