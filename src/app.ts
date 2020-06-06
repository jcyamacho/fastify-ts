/* eslint-disable global-require */
import path from 'path'
import fp from 'fastify-plugin'
import AutoLoad from 'fastify-autoload'

import config from './config'

export = fp(function app(fastify, opts, next) {
  // Place here your custom code!

  // Do not touch the following lines
  const options = { ...config, ...opts }

  // Plugins
  fastify.register(require('fastify-helmet'))
  fastify.register(require('fastify-cors'))
  fastify.register(require('fastify-compress'))
  fastify.register(require('fastify-swagger'), {
    routePrefix: '/swagger',
    swagger: {
      info: require('../package.json'),
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here'
      },
      tags: [
        { name: 'example', description: 'Example related end-points' },
        { name: 'root', description: 'Root end-point' }
      ]
    },
    exposeRoute: true
  })

  // Hooks
  fastify.addHook('onSend', require('./hooks/etag'))

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    ignorePattern: /__tests__/,
    includeTypeScript: true,
    options
  })

  // This loads all plugins defined in services
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'services'),
    ignorePattern: /__tests__/,
    includeTypeScript: true,
    options
  })

  // Make sure to call next when done
  next()
})
