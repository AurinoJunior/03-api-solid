import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333)
})

const envValidate = envSchema.safeParse(process.env)

if (!envValidate.success) {
  console.error('❌ Invalid env variables', envValidate.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = envValidate.data
