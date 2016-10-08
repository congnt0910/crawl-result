import './src/bin/env'

// ----------------------------------------------------------
import LogDebug from './src/helper/logdebug'
const debug = new LogDebug('TEST')
debug('shit')

// ----------------------------------------------------------
// // test rawData/genStructLichMoThuong
// import genStructLichMoThuong from './rawData/genStructLichMoThuong'

// ----------------------------------------------------------
// // insert default data (MIGRATE). Must change env variable. see src/bin/.env
// import { run } from './src/database/migrate'
// run()

// ----------------------------------------------------------
// test ham su ly du lieu kq truoc khi insert
// import { run } from './src/core/__test__'
// run()

// ----------------------------------------------------------
import moment from 'moment'
const tmp = moment('28:15', 'HH:mm')
console.log(tmp.toString())
console.log(tmp.isValid())
// ----------------------------------------------------------
// // test node schedule
// import schedule, { RecurrenceRule } from 'node-schedule'
//
// const taskSchedule = new RecurrenceRule()
// taskSchedule.minute = 1
// let counter = 0
// const reportOnSchdeule = () => {
//   // increment the counter
//   counter++
//
//   // report that the scheduled task ran
//   console.log('The scheduled task ran. This is iteration #: ' + counter, ' > ', new Date())
// }
// schedule.scheduleJob('*/1 * * * *', reportOnSchdeule)
// console.log('The schdule has been initialzed', ' > ', new Date())

// import {doProcessKQ} from './src/core'
// doProcessKQ()
