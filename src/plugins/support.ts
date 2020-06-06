import fp from 'fastify-plugin'

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

export = fp(async function support(fastify, opts) {
  fastify.decorate('someSupport', function someSupport() {
    return opts.APP_SUPPORT_MESSAGE
  })
})

// type declaration of the plugin

declare module 'fastify' {
  export interface FastifyInstance<HttpServer, HttpRequest, HttpResponse> {
    someSupport(): string
  }
}
