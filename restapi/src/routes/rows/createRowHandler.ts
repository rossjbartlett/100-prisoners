import { FastifyReply } from 'fastify'
import { RequestGeneric } from '../../types/server'
import createRowBodyJSONSchema from '../schemas/createRowBody.json'
import { FastifyServer } from '../../server/server'
import { RowModel } from '../../model/rowModel'
import { replyFailure } from '../../utils/error'
import { CreateRowBody } from '../types/createRowBody'

const VERSION = 'v1'
const CREATE_ROW_ROUTE = 'rows'
const NO_CONTENT_STATUS_CODE = 204

export const createRowRouteOptions = {
  schema: {
    description: 'Create Row',
    summary: 'Create Row',
    tags: ['create'],
    body: createRowBodyJSONSchema,
  },
}

export interface CreateRowRequest {
  readonly Body: CreateRowBody
}

export function createRowHandler(model: RowModel) {
  return async (
    req: RequestGeneric<CreateRowRequest>,
    reply: FastifyReply,
  ): Promise<void> => {
    try {
      await model.insertRow(req.body.value)
      reply.status(NO_CONTENT_STATUS_CODE).send()
    } catch (error) {
      replyFailure(reply, error, 'Failed to create Row')
    }
  }
}

export function initCreateRowHandler(
  server: FastifyServer,
  rowModel: RowModel,
): void {
  server.post(
    `/${VERSION}/${CREATE_ROW_ROUTE}`,
    createRowRouteOptions,
    createRowHandler(rowModel),
  )
}
