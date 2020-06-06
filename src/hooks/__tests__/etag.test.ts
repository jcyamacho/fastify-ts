import fastify from 'fastify'
import { Readable } from 'stream'

import etagHook = require('../etag')

describe('etag', () => {
  it('should return provided etag', async () => {
    expect.assertions(2)
    const etag = 'tRAZ3r5Ohb'
    const app = fastify()
    app.addHook('onSend', etagHook)
    app.get('/', (_, res) => {
      res.header('etag', etag).send('hello')
    })
    await app.ready()
    const res = await app.inject({
      url: '/'
    })
    expect(res.headers).toHaveProperty('etag')
    expect(res.headers.etag).toBe(etag)
  })

  it('should return 304 when etag match', async () => {
    expect.assertions(1)
    const etag = 'tRAZ3r5Ohb'
    const app = fastify()
    app.addHook('onSend', etagHook)
    app.get('/', (_, res) => {
      res.header('etag', etag).send('hello')
    })
    await app.ready()
    const res = await app.inject({
      url: '/',
      headers: {
        'if-none-match': etag
      }
    })
    expect(res.statusCode).toBe(304)
  })

  it('should create etag from payload', async () => {
    expect.assertions(1)
    const app = fastify()
    app.addHook('onSend', etagHook)
    app.get('/', (_, res) => {
      res.send('hello')
    })
    await app.ready()
    const res = await app.inject({
      url: '/'
    })
    expect(res.headers).toHaveProperty('etag')
  })

  it('should not create etag from stream payload', async () => {
    expect.assertions(1)
    const app = fastify()
    app.addHook('onSend', etagHook)
    app.get('/', (_, res) => {
      res.send(Readable.from('hello'))
    })
    await app.ready()
    const res = await app.inject({
      url: '/'
    })
    expect(res.headers).not.toHaveProperty('etag')
  })
})
