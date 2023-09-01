import { FastifyReply, FastifyRequest } from 'fastify'

export async function healthcheck(_: FastifyRequest, reply: FastifyReply) {
  return reply.status(200).send({
    message: 'ok',
  })
}
