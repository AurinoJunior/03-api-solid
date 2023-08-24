import fastify from 'fastify'
import { ZodError } from 'zod'

import { appRoutes } from './http/routes'
import { env } from './env'
import { UserAlreadyExistsError } from './use-cases/errors/user-already-exists-error'

export const app = fastify()

app.register(appRoutes)
app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (error instanceof UserAlreadyExistsError) {
    return reply.status(409).send({ message: error.message })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal server error' })
})
