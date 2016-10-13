// import sys from 'sys'
// import { exec } from 'child_process'
// import config from '../../config'
//
// // pg_dump -U USERNAME DBNAME > dbexport.pgsql
//
// child = exec(`pg_dump -U ${config.dbConfig.user} ${config.dbConfig.database} > dbexport.pgsql`, function (error, stdout, stderr) {
//   sys.print('stdout: ' + stdout)
//   sys.print('stderr: ' + stderr)
//   if (error !== null) {
//     console.log('exec error: ' + error)
//   }
// })
// "C:\Program Files\PostgreSQL\9.6\bin\pg_dump" -U postgres xs_db > dbexport.pgsql

// restore

// psql -U USERNAME DBNAME < dbexport.pgsql
