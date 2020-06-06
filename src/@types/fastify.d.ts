import 'fastify'

declare module 'fastify' {
  export interface RouteSchema {
    tags?: string[]
  }
}
