import loaiModel from '../model/loai'
import moment from 'moment'
import schedule from 'node-schedule'
import Crawl from './crawl'
import config from '../config'

import LogDebug from '../helper/logdebug'
const debug = new LogDebug('TEST')

/***
 * start main schedule
 */
const run = () => {
  // create main schedule. runs at 6:00am every day
  schedule.scheduleJob('0 6 * * *', processMainSchedule)
  console.log('The main schedule has been initialized')
  // run manual if start app after 6:00 am
  const now = moment()
  const tmp = now.format('MM/DD/YYYY')
  const scheduleTime = moment(tmp + ' 06:00:00', 'MM/DD/YYYY HH:mm:ss')
  if (scheduleTime.hours() > now.hours()) {
    debug('run processMainSchedule')
    processMainSchedule()
  }
}

/***
 * Hàm xử lý cho main schedule
 * main schedule la schedule chay vao 1 gio trong ngay de xac dinh co bao nhieu loai xs mo thuong trong ngay
 * -> tao schedule cho tung loai xs
 * @returns {Promise}
 */
const processMainSchedule = () => {
  let loai
  // get current day of week
  const now = moment()
  let dayOfWeek = now.day() //  Sunday as 0 and Saturday as 6
  if (dayOfWeek === 0) {
    dayOfWeek = 8 // sunday
  } else {
    dayOfWeek += 1
  }
  const date = now.toString(config.inputFormatDate)
  return Promise.resolve()
    .then(loaiModel.getAll)
    .then(res => {
      loai = res
      // filter cate in day
      const cateInDay = loai.filter(item => {
        const scanDate = JSON.parse(item.scanDate)
        return scanDate.indexOf(dayOfWeek) > -1
      })
      debug('create schedule each cate')
      // create schedule each cate
      cateInDay.forEach(item => {
        debug('   ->|', item.name)
        _createCateSchedule(date, item)
      })
    })
    .catch(err => {
      _handleError(err)
    })
}

/***
 * Create schedule for category. Run only one time
 * @param date {string} date to crawl
 * @param cateInfo {Object}
 */
const _createCateSchedule = (date, cateInfo) => {
  const scanTimeBegin = moment(cateInfo.scanTimeBegin, 'HH:mm')
  const scanTimeEnd = moment(cateInfo.scanTimeEnd, 'HH:mm')
  if (!scanTimeBegin.isValid() || !scanTimeEnd.isValid()) {
    _handleError(new Error(`scan time invalid: ${cateInfo.name} [ ${cateInfo.scanTimeBegin} - ${cateInfo.scanTimeEnd} ]`))
    return
  }
  // cron job runs at scanTimeBegin every day but cancellation this job in first run
  const crawlSchedule = schedule.scheduleJob(`${scanTimeBegin.minutes()} ${scanTimeBegin.hours()} * * *`, () => {
    console.log('The scheduled cate task ran: ', cateInfo.name)
    const c = new Crawl(date, cateInfo)
    c.createScheduleCrawl()
    crawlSchedule.cancel() // cancel job. it will run only once
  })
  console.log('The cate schedule has been initialized')
}

const _handleError = (errInfo) => {
  // do something, may be write error log into file
  console.error(errInfo.stack)
}

// TODO: nhận đầu vào là 1 này -> Quét lấy dữ liệu tất cả loại xổ số mở thưởng ngày đó lưu vào db
// TODO: tao api de control tu ui

export {
  /**
   * start main schedule
   * @function
   */
  run,
  /**
   * Hàm xử lý cho main schedule
   * main schedule la schedule chay vao 1 gio trong ngay de xac dinh co bao nhieu loai xs mo thuong trong ngay
   * -> tao schedule cho tung loai xs
   * @function
   * @returns {Promise}
   */
  processMainSchedule
}
