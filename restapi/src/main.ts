import dotenv from 'dotenv'
import { db } from './utils/db'
import { createServer, registerPlugins } from './server/server'
import { createModels } from './model/model'
import { createHandlers } from './routes/handlers'

dotenv.config()

const { POSTGRES_DB_URI } = process.env
const APP_PORT = parseInt(process.env.APP_PORT || '4000')
const ERROR_EXIT_CODE = 1
const ADDRESS = '0.0.0.0'

async function main(): Promise<void> {
  dotenv.config()

  try {
    const server = createServer()
    await registerPlugins(server)

    // setup db
    db.connect(POSTGRES_DB_URI || '')

    const models = createModels(db)

    createHandlers(server, models)

    server.listen(APP_PORT, ADDRESS, (err, address) => {
      if (err) {
        console.error(`failed to start server: ${err}`)
        process.exit(ERROR_EXIT_CODE)
      }
      console.info(`Server listening at ${address}`)
    })
  } catch (error) {
    console.error(`Failed to run server: ${error}`)
    process.exit(ERROR_EXIT_CODE)
  }
}

main()
