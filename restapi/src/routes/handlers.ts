import { createStatusHandler as initStatusHandler } from './status/statusHandler'
import { FastifyServer } from '../server/server'
import { Models } from '../model/model'
import { initGetRowsHandler } from './rows/getRowsHandler'
import { initCreateRowHandler } from './rows/createRowHandler'

export function createHandlers(
  server: FastifyServer,
  { rowModel }: Models,
): void {
  // Status
  initStatusHandler(server)

  // Get
  initGetRowsHandler(server, rowModel)

  // Post
  initCreateRowHandler(server, rowModel)
}
