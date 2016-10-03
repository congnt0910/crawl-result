import { mysqlConfig, mysqlMultipleStatementsConfig } from './mysql'

export default {
  inputFormatDate: 'MM/DD/YYYY',
  dbConfig: {
    ...mysqlConfig
  },
  dbConfigExtra: {
    ...mysqlMultipleStatementsConfig
  }
}
