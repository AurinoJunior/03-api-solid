import { app } from '@/app'
import { register, authenticate } from './controllers'

export async function appRoutes() {
  app.post('/users', register)
  app.post('/sessions', authenticate)
}
