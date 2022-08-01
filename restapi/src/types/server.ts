import { FastifyRequest } from 'fastify'
import { Server, IncomingMessage } from 'http'

export type RequestGeneric<T> = FastifyRequest<T, Server, IncomingMessage>
