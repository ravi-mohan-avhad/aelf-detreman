import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master, token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Invoice, { schema } from './model'

const router = new Router()
const { date, description, amount, currency, status, nft, receiver, issuer } = schema.tree

/**
 * @api {post} /invoices Create invoice
 * @apiName CreateInvoice
 * @apiGroup Invoice
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam date Invoice's date.
 * @apiParam description Invoice's description.
 * @apiParam amount Invoice's amount.
 * @apiParam currency Invoice's currency.
 * @apiParam status Invoice's status.
 * @apiParam nft Invoice's nft.
 * @apiParam receiver Invoice's receiver.
 * @apiParam issuer Invoice's issuer.
 * @apiSuccess {Object} invoice Invoice's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Invoice not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ date, description, amount, currency, status, nft, receiver, issuer }),
  create)

/**
 * @api {get} /invoices Retrieve invoices
 * @apiName RetrieveInvoices
 * @apiGroup Invoice
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} invoices List of invoices.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /invoices/:id Retrieve invoice
 * @apiName RetrieveInvoice
 * @apiGroup Invoice
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} invoice Invoice's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Invoice not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true, roles: ['admin'] }),
  show)

/**
 * @api {put} /invoices/:id Update invoice
 * @apiName UpdateInvoice
 * @apiGroup Invoice
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam date Invoice's date.
 * @apiParam description Invoice's description.
 * @apiParam amount Invoice's amount.
 * @apiParam currency Invoice's currency.
 * @apiParam status Invoice's status.
 * @apiParam nft Invoice's nft.
 * @apiParam receiver Invoice's receiver.
 * @apiParam issuer Invoice's issuer.
 * @apiSuccess {Object} invoice Invoice's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Invoice not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ date, description, amount, currency, status, nft, receiver, issuer }),
  update)

/**
 * @api {delete} /invoices/:id Delete invoice
 * @apiName DeleteInvoice
 * @apiGroup Invoice
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Invoice not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
