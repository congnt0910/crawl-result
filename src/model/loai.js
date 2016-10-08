import { conn, tableName } from '../database/knex'

/***
 * Fetch all data in table `loai`
 * @returns {Promise.<error|object>}
 */
const getAll = () => {
  return conn(tableName.loai).select()
}

const getById = (id) => {
  return conn(tableName.loai).where({ id }).first()
}

/***
 * Insert data into table `loai`
 * @param data array of object
 * @returns {Promise.<error|object>}
 */
const insert = (data) => {
  return conn(tableName.loai).insert(data, 'id')
}

export default {
  getAll,
  insert
}
