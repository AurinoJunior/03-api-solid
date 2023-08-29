import { app } from '@/app'
import { register, authenticate, healthcheck } from './controllers'

export async function appRoutes() {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.get('/healthcheck', healthcheck)
}
