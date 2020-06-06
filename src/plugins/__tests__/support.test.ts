import fastify from 'fastify'

import Support = require('../support')

describe('support', () => {
  let app: fastify.FastifyInstance

  beforeAll(async () => {
    app = fastify()
    app.register(Support, { APP_SUPPORT_MESSAGE: 'hello' })
    await app.ready()
  })

  it('support works standalone', async () => {
    expect.assertions(1)
    const res = app.someSupport()
    expect(res).toBe('hello')
  })
})
