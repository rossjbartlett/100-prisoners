import { FastifyReply } from 'fastify'
import { RequestGeneric } from '../../types/server'
import getRowsQueryJSONSchema from '../schemas/getRowsQuery.json'
import getRowsResponseJSONSchema from '../schemas/getRowsResponse.json'
import { FastifyServer } from '../../server/server'
import { RowModel } from '../../model/rowModel'
import { replyFailure } from '../../utils/error'
import { GetRowsQuery } from '../types/getRowsQuery'

const VERSION = 'v1'
const GET_ROWS_ROUTE = 'rows'

export const getRowsRouteOptions = {
  schema: {
    tags: ['get'],
    query: getRowsQueryJSONSchema,
    response: {
      200: getRowsResponseJSONSchema,
    },
    description: 'Get rows',
    summary: 'Get rows',
  },
}

export interface GetRowsRequestInterface {
  readonly Querystring: GetRowsQuery
}

export function getRowsHandler(model: RowModel) {
  return async (
    req: RequestGeneric<GetRowsRequestInterface>,
    reply: FastifyReply,
  ): Promise<void> => {
    try {
      const rows = await model.getRows()
      reply.send({ rows })
    } catch (error) {
      replyFailure(reply, error, 'Failed to get Rows')
    }
  }
}

export function initGetRowsHandler(
  server: FastifyServer,
  rowModel: RowModel,
): void {
  server.get(
    `/${VERSION}/${GET_ROWS_ROUTE}`,
    getRowsRouteOptions,
    getRowsHandler(rowModel),
  )
}
