const dbConfig = {
  host: '127.0.0.1',
  user: 'postgres',
  password: '1',
  database: 'xs_db'
}

const dbConfigExtra = {
  // debug: true, // remove comment if you want debug
  pool: {min: 0, max: 200}
}

export {
  dbConfig,
  dbConfigExtra
}
