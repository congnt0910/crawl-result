import config from '../../config'
import { isPro } from '../../bin/env'
import { createSchema } from './schema'

const tableName = {
  'mien': 'mien',
  'giai': 'giai',
  'loai': 'loai',
  'ketqua': 'ketqua'
}

/***
 * Create database if not exist. Error if user not permission
 * @returns {*|Promise.<boolean>}
 */
const createDatabase = () => {
  if (isPro()) {
    return Promise.resolve(true)
  }
  const knexMaster = require('knex')({
    client: 'mysql',
    connection: { ...config.dbConfig, database: 'information_schema' }
  })
  return knexMaster.raw(`CREATE DATABASE IF NOT EXISTS ${config.dbConfig.database};`)
    .then(() => {
      return true
    })
}

/***
 * Connect to db
 * @returns {Promise.<connection>}
 */
const connect = () => {
  const conn = require('knex')({
    client: 'mysql',
    connection: config.dbConfig,
    // debug: true, // remove comment if you want debug
    pool: { min: 0, max: 200 }
  })
  return createDatabase()
    .then(() => createSchema(conn))
    .then(() => {
      return conn
    })
}

export {
  connect as default,
  tableName,
  createDatabase
}
