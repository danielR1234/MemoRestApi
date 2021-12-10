import express from 'express'
import { createConnection } from 'typeorm'
import memo from './routes/memoRoutes'

const main = async () => {
  const connection = await createConnection()
  await connection.runMigrations()
  const app = express()

  // parse form data
  app.use(express.urlencoded({ extended: false }))
  // parse json
  app.use(express.json())

  app.use('/memo', memo)

  app.listen(3001, () => {
    console.log(`Server starte on port ${3001}`)
  })
}

main().catch((err) => {
  console.log('error', err)
})
