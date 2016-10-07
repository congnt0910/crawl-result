const dbConfig = {
  connectionLimit: 100,
  host: 'localhost',
  port: '3306',
  database: 'xs_db',
  user: 'root',
  password: ''
}

const dbConfigExtra = {
  // debug: true, // remove comment if you want debug
  pool: {min: 0, max: 200}
}

export {
  dbConfig,
  dbConfigExtra
}

