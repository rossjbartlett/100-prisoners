import fastify, { FastifyInstance, FastifyLoggerInstance } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'

export type FastifyServer = FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse,
  FastifyLoggerInstance
>

export interface ServerOpts {
  readonly logger?: boolean
}

export function createServer(opt?: ServerOpts): FastifyServer {
  return fastify({
    logger: opt?.logger,
  })
}
export async function registerPlugins(server: FastifyServer): Promise<void> {
  // middie is the plugin that add middlewares support on steroids to Fastify.
  // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
  await server.register(require('middie'))

  // Helmet helps you secure your apps by setting various HTTP headers. It's not a silver bullet, but it can help!
  // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
  server.register(require('fastify-helmet'), {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  })

  server.register(require('fastify-cors'), {
    // put any cors options here
  })

  // Helmet helps you secure your apps by setting various HTTP headers. It's not a silver bullet, but it can help!
  // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
  server.register(require('fastify-swagger'), {
    swagger: {
      info: {
        title: 'Test App Swagger Docs',
        description: 'Swagger documentation for Test App',
        version: '0.1.0',
      },
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
    },
    exposeRoute: true,
    routePrefix: '/docs',
  })
}
