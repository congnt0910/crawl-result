const tableName = {}
/***
 * Create database if not exist. Error if user not permission
 * @returns {*|Promise.<boolean>}
 */
const createDatabase = () => {
  return Promise.reject(Error('not implement'))
}

/***
 * Connect to db
 * @returns {Promise.<connection>}
 */
const connect = () => {
  return Promise.reject(Error('not implement'))
}

export {
  connect as default,
  tableName,
  createDatabase
}
