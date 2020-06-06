import envSchema from 'env-schema'
import S from 'fluent-schema'

export default envSchema({
  schema: S.object().prop('APP_SUPPORT_MESSAGE', S.string().required().default('hello!')),
  dotenv: true
})
