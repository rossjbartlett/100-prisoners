import { FastifyRequest, FastifyReply } from 'fastify'
import { FastifyServer } from '../../server/server'

const VERSION = 'v1'
const STATUS_ROUTE = 'status'

export const statusRouteOptions = {
  schema: {
    description: 'Get an OK response from the server',
    summary: 'Status response',
    tags: ['status'],
    params: {},
  },
}

export function statusHandler(req: FastifyRequest, reply: FastifyReply): void {
  reply.send('OK')
}

export function createStatusHandler(server: FastifyServer): void {
  server.get(`/${VERSION}/${STATUS_ROUTE}`, statusRouteOptions, statusHandler)
}
