import { conn, tableName } from '../database/knex'

/***
 *
 * @returns {Promise.<error|object>}
 */
const getAll = () => {
  return conn(tableName.mien).select()
}

/***
 *
 * @param data array of object
 * @returns {Promise.<error|Object>}
 */
const insert = (data) => {
  return conn(tableName.mien).insert(data, 'id')
}

export default {
  getAll,
  insert
}
