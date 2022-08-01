import { createServer } from '../../../server/server'
import { createStatusHandler } from '../statusHandler'

const SUCCESS_CODE = 200

describe('Ping handler tests', () => {
  const server = createServer()
  createStatusHandler(server)

  afterAll(async () => {
    await server.close()
  })

  it('handles the ping request properly', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/v1/status',
    })

    expect(res.statusCode).toEqual(SUCCESS_CODE)
    expect(res.body).toEqual('OK')
  })
})
