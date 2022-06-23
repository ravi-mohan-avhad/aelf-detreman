import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master, token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Team, { schema } from './model'

const router = new Router()
const { name, status, teamleader, manager } = schema.tree

/**
 * @api {post} /teams Create team
 * @apiName CreateTeam
 * @apiGroup Team
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Team's name.
 * @apiParam status Team's status.
 * @apiParam teamleader Team's teamleader.
 * @apiParam manager Team's manager.
 * @apiSuccess {Object} team Team's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Team not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ name, status, teamleader, manager }),
  create)

/**
 * @api {get} /teams Retrieve teams
 * @apiName RetrieveTeams
 * @apiGroup Team
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} teams List of teams.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /teams/:id Retrieve team
 * @apiName RetrieveTeam
 * @apiGroup Team
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} team Team's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Team not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true, roles: ['admin'] }),
  show)

/**
 * @api {put} /teams/:id Update team
 * @apiName UpdateTeam
 * @apiGroup Team
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Team's name.
 * @apiParam status Team's status.
 * @apiParam teamleader Team's teamleader.
 * @apiParam manager Team's manager.
 * @apiSuccess {Object} team Team's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Team not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ name, status, teamleader, manager }),
  update)

/**
 * @api {delete} /teams/:id Delete team
 * @apiName DeleteTeam
 * @apiGroup Team
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Team not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
