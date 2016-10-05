import {dbConfig, dbConfigExtra} from './postgres'

export default {
  inputFormatDate: 'MM/DD/YYYY',
  dbConfig: {
    ...dbConfig
  },
  dbConfigExtra: {
    ...dbConfigExtra
  }
}
