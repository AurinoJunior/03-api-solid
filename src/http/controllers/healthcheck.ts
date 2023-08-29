import { FastifyReply, FastifyRequest } from 'fastify'

export async function healthcheck(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  return reply.status(200).send({
    message: 'ok',
  })
}
