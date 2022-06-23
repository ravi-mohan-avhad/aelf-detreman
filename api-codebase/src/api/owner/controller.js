import { success, notFound } from '../../services/response/'
import { Owner } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Owner.create(body)
    .then((owner) => owner.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Owner.find(query, select, cursor)
    .then((owners) => owners.map((owner) => owner.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Owner.findById(params.id)
    .then(notFound(res))
    .then((owner) => owner ? owner.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Owner.findById(params.id)
    .then(notFound(res))
    .then((owner) => owner ? Object.assign(owner, body).save() : null)
    .then((owner) => owner ? owner.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Owner.findById(params.id)
    .then(notFound(res))
    .then((owner) => owner ? owner.remove() : null)
    .then(success(res, 204))
    .catch(next)
