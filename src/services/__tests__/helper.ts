// This file contains code that we reuse
// between our tests.
import fastify from 'fastify'

import App = require('../../app')

// Fill in this config with all the configurations
// needed for testing the application
function config() {
  return {}
}

// automatically build our instance
export function build() {
  const app = fastify()
  app.register(App, config())

  return app.ready()
}
