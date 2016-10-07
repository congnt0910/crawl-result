import config from '../../config'
import {isPro} from '../../bin/env'
import {createSchema} from './schema'
import _ from 'lodash'

const tableName = {
  'mien': 'mien',
  'giai': 'giai',
  'loai': 'loai',
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
  if (isPro()) {
    return Promise.resolve(true)
  }
  const knexMaster = require('knex')({
    client: 'mysql',
    connection: {...config.dbConfig, database: 'information_schema'}
  })
  return knexMaster.raw(`CREATE DATABASE IF NOT EXISTS ${config.dbConfig.database};`)
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
  if (isPro()) {
    return Promise.resolve(true)
  }
  const knexMaster = require('knex')({
    client: 'mysql',
    connection: {...config.dbConfig, database: 'information_schema'}
  })
  return knexMaster.raw(`DROP DATABASE ${config.dbConfig.database};`)
    .then(() => {
      // destroy connection
      return knexMaster.destroy()
    })
    .then(() => {
      return true
    })
}

/***
 * Connect to db
 * @returns {Promise.<connection>}
 */
const connect = () => {
  // TOTO: Research migrates
  const conn = require('knex')({
    client: 'mysql',
    connection: config.dbConfig,
    // debug: true, // remove comment if you want debug
    pool: {min: 0, max: 200}
  })
  createDatabase()
    .then(() => createSchema(tableName, conn))
    .then(() => {
      dbReady = true
    })

  return conn
}

/***
 * Truncates all table
 * @param conn - connection to db (knex)
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
  truncateAllTable
}
