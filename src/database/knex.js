import connect, {
  tableName,
  waitDbReady,
  truncateAllTable,
  dropDatabase,
  createSchema,
  createDatabase
}
  from './postgres' // change it if use another client

const conn = connect()

/**
 * Module connect to database
 * @module database/knex
 */
export {
  /**
   * Connection
   * @type {Knex}
   */
  conn,
  /**
   * Table name
   * @type {Object}
   */
  tableName,
  /**
   * Wait to connection
   * @function
   * @returns {Promise}
   */
  waitDbReady,
  /**
   * Truncate all table
   * @function
   * @returns {Promise}
   */
  truncateAllTable,
  /**
   * Drop database
   * @function
   * @returns {Promise}
   */
  dropDatabase,
  /**
   * Create schema
   * @function
   * @returns {Promise}
   */
  createSchema,
  /**
   * Create database
   * @function
   * @returns {Promise}
   */
  createDatabase
}

