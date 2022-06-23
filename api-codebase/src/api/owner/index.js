import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master, token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Owner, { schema } from './model'

const router = new Router()
const { transferdate, description, sender, receiver, level1approver, level2approver, level1status, level2status, overallstatus } = schema.tree

/**
 * @api {post} /owners Create owner
 * @apiName CreateOwner
 * @apiGroup Owner
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam transferdate Owner's transferdate.
 * @apiParam description Owner's description.
 * @apiParam sender Owner's sender.
 * @apiParam receiver Owner's receiver.
 * @apiParam level1approver Owner's level1approver.
 * @apiParam level2approver Owner's level2approver.
 * @apiParam level1status Owner's level1status.
 * @apiParam level2status Owner's level2status.
 * @apiParam overallstatus Owner's overallstatus.
 * @apiSuccess {Object} owner Owner's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Owner not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ transferdate, description, sender, receiver, level1approver, level2approver, level1status, level2status, overallstatus }),
  create)

/**
 * @api {get} /owners Retrieve owners
 * @apiName RetrieveOwners
 * @apiGroup Owner
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} owners List of owners.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /owners/:id Retrieve owner
 * @apiName RetrieveOwner
 * @apiGroup Owner
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} owner Owner's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Owner not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /owners/:id Update owner
 * @apiName UpdateOwner
 * @apiGroup Owner
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam transferdate Owner's transferdate.
 * @apiParam description Owner's description.
 * @apiParam sender Owner's sender.
 * @apiParam receiver Owner's receiver.
 * @apiParam level1approver Owner's level1approver.
 * @apiParam level2approver Owner's level2approver.
 * @apiParam level1status Owner's level1status.
 * @apiParam level2status Owner's level2status.
 * @apiParam overallstatus Owner's overallstatus.
 * @apiSuccess {Object} owner Owner's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Owner not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ transferdate, description, sender, receiver, level1approver, level2approver, level1status, level2status, overallstatus }),
  update)

/**
 * @api {delete} /owners/:id Delete owner
 * @apiName DeleteOwner
 * @apiGroup Owner
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Owner not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
