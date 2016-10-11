const createSchema = (tableName, conn) => {
  return Promise.resolve()
    .then(() => {
      // may be use createTableIfNotExist ?
      return conn.schema.hasTable(tableName.mien)
        .then(exist => {
          // do no thing if exist
          if (exist) return true
          // create table mien
          return conn.schema.createTable(tableName.mien, (table) => {
            table.increments('id').primary()
            table.string('name', 255).unique().collate('utf8_unicode_ci')
            table.timestamps(true, true) // adds a created_at and updated_at
          })
        })
    })
    .then(() => {
      return conn.schema.hasTable(tableName.giai)
        .then(exist => {
          // do no thing if exist
          if (exist) return true
          // create table giai
          return conn.schema.createTable(tableName.giai, (table) => {
            table.integer('id').primary()
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
          // create table loai
          return conn.schema.createTable(tableName.loai, (table) => {
            table.increments('id').primary()
            table.string('name', 255).collate('utf8_unicode_ci').comment('ten loai')
            table.string('scanDate', 255).comment('danh sach cac ngay mo thuong')
            table.string('scanTimeBegin', 255).comment('hh:mm - thoi gian bat dau quet lay ket qua mo thuong. gio quay so')
            table.string('scanTimeEnd', 255).comment('hh:mm - thoi gian dung quet')
            table.boolean('useScanTime').defaultTo(false)
            table.string('url', 255).comment('path url')
            table.integer('mienId')
            table.foreign('mienId').references('mien.id')
            table.timestamps(true, true)
          })
        })
    })
    .then(() => {
      return conn.schema.hasTable(tableName.ketqua)
        .then(exist => {
          // do no thing if exist
          if (exist) return true
          // create table ket qua
          return conn.schema.createTable(tableName.ketqua, (table) => {
            table.increments('id').primary()
            table.string('value', 255).comment('')
            table.integer('date', 255).comment('ngay mo thuong. luu dang timestamp MM/DD/YYYY')
            table.integer('loaiId')
            table.integer('giaiId')
            table.foreign('loaiId').references('loai.id')
            table.foreign('giaiId').references('giai.id')
            table.timestamps(true, true)
          })
        })
    })
    .then(() => {
      return conn.schema.hasTable(tableName.configCrawl)
        .then(exist => {
          // do no thing if exist
          if (exist) return true
          // create table ket qua
          return conn.schema.createTable(tableName.configCrawl, (table) => {
            table.increments('id').primary()
            table.string('url', 255)
            table.string('code', 255)
            table.string('key', 255)
            table.integer('loaiId')
            table.unique(['loaiId', 'key'])
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
