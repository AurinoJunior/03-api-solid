import { app } from '@/app'
import { register } from './controllers/register'

export async function appRoutes() {
  app.post('/users', register)
}
