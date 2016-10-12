import {
  conn,
  tableName,
  dropDatabase,
  createSchema,
  createDatabase
}
  from '../database/knex'
import { run as runMigrate } from '../database/migrate'

const run = () => {
  console.log('drop database')
  return dropDatabase()
    .then(() => {
      console.log('create database')
      return createDatabase()
    })
    .then(() => {
      console.log('create schema')
      return createSchema(tableName, conn)
    })
    .then(() => {
      console.log('run migrate')
      return runMigrate()
    })
    .then(() => console.log('DONE!!!'))
}

// export default {
//   run
// }
run()
