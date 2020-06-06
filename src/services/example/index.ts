import { FastifyInstance } from 'fastify'
import S from 'fluent-schema'

export = async function example(fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/example',
    handler(_request, reply) {
      reply.send({ message: `this is an example: ${this.someSupport()}` })
    },
    schema: {
      tags: ['example'],
      response: {
        200: S.object().prop('message', S.string().required())
      }
    }
  })
}
