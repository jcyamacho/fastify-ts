import crypto from 'crypto'
import { ServerResponse } from 'http'
import { FastifyRequest, FastifyReply } from 'fastify'

const ETAG_HEADER: string = 'etag'

function setEtag(res: FastifyReply<ServerResponse>, payload: string): string {
  if (res.hasHeader(ETAG_HEADER)) {
    return res.getHeader(ETAG_HEADER) as string
  }
  const hash = crypto.createHash('sha1').update(payload).digest('base64').substring(0, 27)
  const etag = `W/"${hash}"`
  res.header('etag', etag)
  return etag
}

export = function etagHook(
  req: FastifyRequest,
  res: FastifyReply<ServerResponse>,
  payload: any,
  done: (err?: Error, value?: any) => void
) {
  if (typeof payload !== 'string') {
    return done()
  }
  const etag = setEtag(res, payload)
  if (req.headers['if-none-match'] && req.headers['if-none-match'] === etag) {
    res.code(304)
    res.send(null)
  }
  return done()
}
