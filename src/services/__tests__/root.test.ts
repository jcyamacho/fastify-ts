import { FastifyInstance } from 'fastify'
import { build } from './helper'

describe('root', () => {
  let app: FastifyInstance

  beforeAll(async () => {
    app = await build()
  })

  it('default route', async () => {
    expect.assertions(1)
    const res = await app.inject({
      url: '/'
    })
    expect(JSON.parse(res.payload)).toStrictEqual({ root: true })
  })
})
