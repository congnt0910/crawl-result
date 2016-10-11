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
// import moment from 'moment'
// const tmp = moment('18:5', 'HH:mm')
// console.log(tmp.minutes())
// console.log(tmp.minute())
// ----------------------------------------------------------
// // test node schedule
// import schedule from 'node-schedule'
//
// let counter = 0
// const reportOnSchdeule = () => {
//   console.log('start run schedule 1')
//
//   // increment the counter
//   counter++
//
//   // report that the scheduled task ran
//   console.log('The scheduled 1 task ran. This is iteration #: ' + counter, ' > ', new Date())
// }
// schedule.scheduleJob('*/9 * * * * *', reportOnSchdeule)
// console.log('The schedule 1 has been initialized', ' > ', new Date())
//
// let counter2 = 0
// const reportOnSchdeule2 = () => {
//   console.log('start run schedule 2')
//   return new Promise((resolve) => setTimeout(resolve, 10000))
//     .then(() => {
//       counter2++
//       console.log('The scheduled 2 task ran. This is iteration #: ' + counter2, ' > ', new Date())
//       return
//     })
// }
// schedule.scheduleJob('*/9 * * * * *', reportOnSchdeule2)
// console.log('The schedule 2 has been initialized', ' > ', new Date())

// import {doProcessKQ} from './src/core'
// doProcessKQ()


const LOAI_DATA = [
  {
    mien: 'MIỀN BẮC',
    name: 'Truyền Thống',
    url: '/xo-so-truyen-thong.php'
  },
  {
    mien: 'MIỀN BẮC',
    name: 'Điện Toán 123',
    url: '/xo-so-dien-toan-123.php'
  },
  {
    mien: 'MIỀN BẮC',
    name: 'Điện Toán 6x36',
    url: '/xo-so-dien-toan-6x36.php'
  },
  {
    mien: 'MIỀN BẮC',
    name: 'Thần Tài',
    url: '/xo-so-than-tai.php'
  },
  {
    mien: 'MIỀN TRUNG',
    name: 'Bình Định',
    url: '/xo-so-binh-dinh.php'
  },
  {
    mien: 'MIỀN TRUNG',
    name: 'Đà Nẵng',
    url: '/xo-so-da-nang.php'
  },
  {
    mien: 'MIỀN TRUNG',
    name: 'Đắc Lắc',
    url: '/xo-so-dac-lac.php'
  },
  {
    mien: 'MIỀN TRUNG',
    name: 'Đắc Nông',
    url: '/xo-so-dac-nong.php'
  },
  {
    mien: 'MIỀN TRUNG',
    name: 'Gia Lai',
    url: '/xo-so-gia-lai.php'
  },
  {
    mien: 'MIỀN TRUNG',
    name: 'Khánh Hoà',
    url: '/xo-so-khanh-hoa.php'
  },
  {
    mien: 'MIỀN TRUNG',
    name: 'Kon Tum',
    url: '/xo-so-kon-tum.php'
  },
  {
    mien: 'MIỀN TRUNG',
    name: 'Ninh Thuận',
    url: '/xo-so-ninh-thuan.php'
  },
  {
    mien: 'MIỀN TRUNG',
    name: 'Phú Yên',
    url: '/xo-so-phu-yen.php'
  },
  {
    mien: 'MIỀN TRUNG',
    name: 'Quảng Bình',
    url: '/xo-so-quang-binh.php'
  },
  {
    mien: 'MIỀN TRUNG',
    name: 'Quảng Nam',
    url: '/xo-so-quang-nam.php'
  },
  {
    mien: 'MIỀN TRUNG',
    name: 'Quảng Ngãi',
    url: '/xo-so-quang-ngai.php'
  },
  {
    mien: 'MIỀN TRUNG',
    name: 'Quảng Trị',
    url: '/xo-so-quang-tri.php'
  },
  {
    mien: 'MIỀN TRUNG',
    name: 'Thừa Thiên Huế',
    url: '/xo-so-thua-thien-hue.php'
  },
  {
    mien: 'MIỀN NAM',
    name: 'An Giang',
    url: '/xo-so-an-giang.php'
  },
  {
    mien: 'MIỀN NAM',
    name: 'Bạc Liêu',
    url: '/xo-so-bac-lieu.php'
  },
  { mien: 'MIỀN NAM', name: 'Bến Tre', url: '/xo-so-ben-tre.php' },
  {
    mien: 'MIỀN NAM',
    name: 'Bình Dương',
    url: '/xo-so-binh-duong.php'
  },
  {
    mien: 'MIỀN NAM',
    name: 'Bình Phước',
    url: '/xo-so-binh-phuoc.php'
  },
  {
    mien: 'MIỀN NAM',
    name: 'Bình Thuận',
    url: '/xo-so-binh-thuan.php'
  },
  { mien: 'MIỀN NAM', name: 'Cà Mau', url: '/xo-so-ca-mau.php' },
  { mien: 'MIỀN NAM', name: 'Cần Thơ', url: '/xo-so-can-tho.php' },
  { mien: 'MIỀN NAM', name: 'Đà Lạt', url: '/xo-so-da-lat.php' },
  {
    mien: 'MIỀN NAM',
    name: 'Đồng Nai',
    url: '/xo-so-dong-nai.php'
  },
  {
    mien: 'MIỀN NAM',
    name: 'Đồng Tháp',
    url: '/xo-so-dong-thap.php'
  },
  {
    mien: 'MIỀN NAM',
    name: 'Hậu Giang',
    url: '/xo-so-hau-giang.php'
  },
  {
    mien: 'MIỀN NAM',
    name: 'Hồ Chí Minh',
    url: '/xo-so-ho-chi-minh.php'
  },
  {
    mien: 'MIỀN NAM',
    name: 'Kiên Giang',
    url: '/xo-so-kien-giang.php'
  },
  { mien: 'MIỀN NAM', name: 'Long An', url: '/xo-so-long-an.php' },
  {
    mien: 'MIỀN NAM',
    name: 'Sóc Trăng',
    url: '/xo-so-soc-trang.php'
  },
  {
    mien: 'MIỀN NAM',
    name: 'Tây Ninh',
    url: '/xo-so-tay-ninh.php'
  },
  {
    mien: 'MIỀN NAM',
    name: 'Tiền Giang',
    url: '/xo-so-tien-giang.php'
  },
  {
    mien: 'MIỀN NAM',
    name: 'Trà Vinh',
    url: '/xo-so-tra-vinh.php'
  },
  {
    mien: 'MIỀN NAM',
    name: 'Vĩnh Long',
    url: '/xo-so-vinh-long.php'
  },
  {
    mien: 'MIỀN NAM',
    name: 'Vũng Tàu',
    url: '/xo-so-vung-tau.php'
  }
]

const tmp = LOAI_DATA.map(item => {
  const obj = {
    ...item,
    key: 'ketqua.net',
    code: ''
  }
  const { mien, ...noMien } = obj
  // console.log(noMien)
  return noMien
})

console.log(tmp)



