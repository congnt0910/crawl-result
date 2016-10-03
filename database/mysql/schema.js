const createSchema = (tableName, conn) => {
  return Promise.resolve()
    .then(() => {
      // may be use createTableIfNotExist ?
      return conn.schema.hasTable(tableName.mien)
        .then(exist => {
          // do no thing if exist
          if (exist) return true
          // create table
          return conn.schema.createTable(tableName.mien, (table) => {
            table.increments('id').primary()
            table.string('name', 255).unique().collate('utf8_unicode_ci')
            table.timestamps(true, true)
          })
        })
    })
    .then(() => {
      return conn.schema.hasTable(tableName.giai)
        .then(exist => {
          // do no thing if exist
          if (exist) return true
          // create table
          return conn.schema.createTable(tableName.giai, (table) => {
            table.increments('id').primary()
            table.string('name', 255).unique().collate('utf8_unicode_ci')
            table.timestamps(true, true)
          })
        })
    })
    .then(() => {
      // Loai xo xo: vd nhu 'truyen thong', 'than tai', ...
      return conn.schema.hasTable(tableName.loai)
        .then(exist => {
          // do no thing if exist
          if (exist) return true
          // create table
          return conn.schema.createTable(tableName.loai, (table) => {
            table.increments('id').primary()
            table.string('name', 255).collate('utf8_unicode_ci').comment('ten loai')
            table.string('time', 255).comment('hh:mm - thoi gian mo thuong. gio quay so')
            table.string('url', 255).comment('path url')
            table.integer('mienId')
            table.timestamps(true, true)
          })
        })
    })
    .then(() => {
      return conn.schema.hasTable(tableName.ketqua)
        .then(exist => {
          // do no thing if exist
          if (exist) return true
          // create table
          return conn.schema.createTable(tableName.ketqua, (table) => {
            table.increments('id').primary()
            table.string('value', 255).comment('')
            table.string('time', 255).comment('MM/DD/YYYY')
            table.integer('loaiId')
            table.integer('giaiId')
            table.timestamps(true, true)
          })
        })
    })
  // .catch(err => {
  //   console.log(err)
  //   throw err
  // })
}

export {
  createSchema
}
