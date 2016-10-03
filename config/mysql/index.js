function common () {
  return {
    connectionLimit: 100,
    host: 'localhost',
    port: '3306',
    database: 'xs_db',
    user: 'root',
    password: ''
  }
}

const mysqlMultipleStatementsConfig = common()
mysqlMultipleStatementsConfig.multipleStatements = true
mysqlMultipleStatementsConfig.connectionLimit = 50

const mysqlConfig = common()

export {
  mysqlConfig,
  mysqlMultipleStatementsConfig
}

