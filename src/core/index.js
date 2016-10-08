import loaiModel from '../model/loai'
import moment from 'moment'
import schedule from 'node-schedule'
// đã có:
//    - api lấy kết quả xổ số từ trang ketqua.net
//    - config connect to db
//    - ham xu ly du lieu lay dc va luu vao db

/***
 * Create schedule for category. Run only one time
 * @param cateInfo {Object}
 * @returns {Error}
 */
const createCateSchedule = (cateInfo) => {
  return new Error('Not Implement')
}

// Hàm xử lý cho main schedule
// main schedule la schedule chay vao 1 gio trong ngay de xac dinh co bao nhieu loai xs mo thuong trong ngay
// -> tao schedule cho tung loai xs
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
  return Promise.resolve()
    .then(loaiModel.getAll)
    .then(res => {
      loai = res
      // filter cate in day
      const cateInDay = loai.filter(item => {
        const scanDate = JSON.parse(item.scanDate)
        return scanDate.indexOf(dayOfWeek) > -1
      })
      console.log(cateInDay)
      // create schedule each cate
      cateInDay.forEach(item => {
        createCateSchedule(item)
      })
    })
    .catch(err => {
      console.log(err.stack)
    })
}

const run = () => {
  // create main schedule. runs at 6:00am every day
  schedule.scheduleJob('0 6 * * *', processMainSchedule)
  console.log('The main schedule has been initialized')
  // run manual if start app after 6:00 am
  const now = moment()
  const tmp = now.format('MM/DD/YYYY')
  const scheduleTime = moment(tmp + ' 06:00:00', 'MM/DD/YYYY HH:mm:ss')
  if (scheduleTime > now) {
    processMainSchedule()
  }
}

// TODO: nhận đầu vào là 1 này -> Quét lấy dữ liệu tất cả loại xổ số mở thưởng ngày đó lưu vào db
// TODO: tao api de control tu ui

export {
  processMainSchedule,
  run
}
