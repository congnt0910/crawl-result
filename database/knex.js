import connect, { tableName } from './mysql' // change it if use another client

const conn = connect()

export {
  conn,
  tableName
}

