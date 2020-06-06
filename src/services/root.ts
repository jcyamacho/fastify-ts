import { FastifyInstance } from 'fastify'
import S from 'fluent-schema'

export = async function root(fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/',
    handler(_request, reply) {
      reply.send({ root: true })
    },
    schema: {
      tags: ['root'],
      response: {
        200: S.object().prop('root', S.boolean().required())
      }
    }
  })
}
