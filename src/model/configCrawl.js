import { conn, tableName } from '../database/knex'

/***
 *
 * @returns {Promise.<error|object>}
 */
const getAll = () => {
  return conn(tableName.configCrawl).select()
}

/**
 * Find config crawl with condition
 * @param filter {object}
 * @returns {*}
 */
const find = (filter) => {
  return conn(tableName.configCrawl).where(filter)
}

/***
 *
 * @param data array of object
 * @returns {Promise.<error|Object>}
 */
const insert = (data) => {
  return conn(tableName.configCrawl).insert(data, 'id')
}

export default {
  getAll,
  find,
  insert
}
