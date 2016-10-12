import config from '../../config'
import { createSchema } from './schema'
import _ from 'lodash'
import LogDebug from '../../helper/logdebug'
const _debug = new LogDebug('DATABASE')

const tableName = {
  'mien': 'mien',
  'giai': 'giai',
  'loai': 'loai',
  'configCrawl': 'config_crawl',
  'ketqua': 'ketqua'
}

let dbReady = false
const waitDbReady = () => {
  return new Promise((resolve) => {
    const check = () => {
      if (dbReady) return resolve()
      setTimeout(check, 10)
    }
    check()
  })
}

/***
 * Create database if not exist. Error if user not permission
 * @returns {Promise.<error|boolean>}
 */
const createDatabase = () => {
  const knexMaster = require('knex')({
    client: 'pg',
    connection: {...config.dbConfig, database: 'postgres'}
  })
  return knexMaster.raw(`SELECT * FROM pg_database WHERE datname = '${config.dbConfig.database}'`)
    .then(row => {
      if (row.rowCount === 1) return true
      // create if not exits
      return knexMaster.raw(`CREATE DATABASE ${config.dbConfig.database}`)
    })
    .then(() => {
      // destroy connection
      return knexMaster.destroy()
    })
    .then(() => {
      return true
    })
}

/***
 * Drop database. just only use for develop or test
 *
 */
const dropDatabase = () => {
  const knexMaster = require('knex')({
    client: 'pg',
    connection: {...config.dbConfig, database: 'postgres'}
  })
  return knexMaster.raw(`DROP DATABASE IF EXISTS ${config.dbConfig.database};`)
    .then(() => {
      // destroy connection
      return knexMaster.destroy()
    })
    .then(() => {
      _debug('Drop data base success')
      return true
    })
}

/***
 * Connect to db
 * @returns {connection} Knex object
 */
const connect = () => {
  const conn = require('knex')({
    client: 'pg',
    connection: config.dbConfig,
    ...config.dbConfigExtra
  })
  dbReady = true
  return conn
}

/***
 * Truncates all table
 * @param conn {Object} connection to db (knex object)
 * @returns {Promise.<boolean|error>}
 */
const truncateAllTable = (conn) => {
  return Promise
    .all(_.map(tableName, (key, tbl) => {
      return conn(tbl).truncate()
    }))
    .then(() => {
      return true
    })
}

export {
  connect as default,
  tableName,
  waitDbReady,
  createDatabase,
  dropDatabase,
  createSchema,
  truncateAllTable
}
