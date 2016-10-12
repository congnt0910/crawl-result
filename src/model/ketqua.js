import { conn, tableName } from '../database/knex'
import config from '../config'
import moment from 'moment'

const getAll = () => {
  return conn(tableName.ketqua).select()
}

/***
 * Get all KQ info by date
 * @param date string
 * @returns {Promise.<error|object>}
 */
const getAllByDay = (date) => {
  // validate date
  date = moment(date, config.inputFormatDate)
  if (date.isValid() === false) return Promise.reject(new Error('Invalid Date'))
  date = date.format('X') // Unix timestamp
  // fetch data
  return conn(tableName.ketqua).select().where({date})
}

/***
 * Insert to table
 * @param data array of object
 * @returns {Promise.<error|object>}
 */
const insert = (data) => {
  return conn(tableName.ketqua).insert(data, 'id')
}

export default {
  getAll,
  getAllByDay,
  insert
}

