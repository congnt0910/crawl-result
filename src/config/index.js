import {dbConfig, dbConfigExtra} from './postgres'
import '../bin/env'

export default {
  inputFormatDate: 'MM/DD/YYYY',
  dbConfig: {
    ...dbConfig
  },
  dbConfigExtra: {
    ...dbConfigExtra
  }
}
