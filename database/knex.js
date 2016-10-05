import connect, {
  tableName,
  waitDbReady,
  truncateAllTable,
  dropDatabase
}
  from './postgres' // change it if use another client

const conn = connect()

export {
  conn,
  tableName,
  waitDbReady,
  truncateAllTable,
  dropDatabase
}

