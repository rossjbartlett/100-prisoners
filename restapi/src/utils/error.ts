import { FastifyReply } from 'fastify'

export const FAILURE_STATUS_CODE = 500
export const NOT_FOUND_STATUS_CODE = 404

export function replyNotFound(reply: FastifyReply): void {
  reply.status(NOT_FOUND_STATUS_CODE).send()
}

export function replyFailure(
  reply: FastifyReply,
  error: Error,
  message: string,
): void {
  console.error(`Replying error: '${message}' ${error}`)
  reply.status(FAILURE_STATUS_CODE).send({ message })
}
