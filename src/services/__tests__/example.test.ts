import { FastifyInstance } from 'fastify'
import { build } from './helper'

describe('example', () => {
  let app: FastifyInstance

  beforeAll(async () => {
    app = await build()
  })

  it('example route', async () => {
    expect.assertions(1)
    const res = await app.inject({
      url: '/example'
    })
    expect(res.json()).toStrictEqual({ message: 'this is an example: hello!' })
  })
})
