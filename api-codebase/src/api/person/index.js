import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master, token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Person, { schema } from './model'

const router = new Router()
const { name, age, email, address, contactnumber, startdate, status, walletaddress } = schema.tree

/**
 * @api {post} /people Create person
 * @apiName CreatePerson
 * @apiGroup Person
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Person's name.
 * @apiParam age Person's age.
 * @apiParam email Person's email.
 * @apiParam address Person's address.
 * @apiParam contactnumber Person's contactnumber.
 * @apiParam startdate Person's startdate.
 * @apiParam status Person's status.
 * @apiParam walletaddress Person's walletaddress.
 * @apiSuccess {Object} person Person's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Person not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ name, age, email, address, contactnumber, startdate, status, walletaddress }),
  create)

/**
 * @api {get} /people Retrieve people
 * @apiName RetrievePeople
 * @apiGroup Person
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} people List of people.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /people/:id Retrieve person
 * @apiName RetrievePerson
 * @apiGroup Person
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} person Person's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Person not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true, roles: ['admin'] }),
  show)

/**
 * @api {put} /people/:id Update person
 * @apiName UpdatePerson
 * @apiGroup Person
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Person's name.
 * @apiParam age Person's age.
 * @apiParam email Person's email.
 * @apiParam address Person's address.
 * @apiParam contactnumber Person's contactnumber.
 * @apiParam startdate Person's startdate.
 * @apiParam status Person's status.
 * @apiParam walletaddress Person's walletaddress.
 * @apiSuccess {Object} person Person's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Person not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ name, age, email, address, contactnumber, startdate, status, walletaddress }),
  update)

/**
 * @api {delete} /people/:id Delete person
 * @apiName DeletePerson
 * @apiGroup Person
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Person not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
