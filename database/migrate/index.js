import _ from 'lodash'
import {
  conn,
  tableName,
  waitDbReady
}
  from '../knex'

const MIEN_DATA = [
  {name: 'MIỀN BẮC'},
  {name: 'MIỀN TRUNG'},
  {name: 'MIỀN NAM'}
]
/***
 * Thông tin loại xổ số được lấy từ menu trang ketqua.net
 * @type {*[]}
 */
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
  {mien: 'MIỀN NAM', name: 'Bến Tre', url: '/xo-so-ben-tre.php'},
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
  {mien: 'MIỀN NAM', name: 'Cà Mau', url: '/xo-so-ca-mau.php'},
  {mien: 'MIỀN NAM', name: 'Cần Thơ', url: '/xo-so-can-tho.php'},
  {mien: 'MIỀN NAM', name: 'Đà Lạt', url: '/xo-so-da-lat.php'},
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
  {mien: 'MIỀN NAM', name: 'Long An', url: '/xo-so-long-an.php'},
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
/***
 * Lịch mở thưởng các loại xổ số. sưu tầm
 * @type {Array}
 */
const LICH_MO_THUONG = [
  // [Truyền thống] hay còn gọi là [Thủ đô]
  {
    mien: 'MIỀN BẮC',
    loai: 'Truyền Thống',
    scanDate: [2, 3, 4, 5, 6, 7, 8],
    scanTimeBegin: '18:15',
    scanTimeEnd: '18:45'
  },
  {
    mien: 'MIỀN BẮC',
    loai: 'Điện Toán 123',
    scanDate: [4],
    scanTimeBegin: '18:05',
    scanTimeEnd: '18:35'
  },
  {
    mien: 'MIỀN BẮC',
    loai: 'Điện Toán 6x36',
    scanDate: [4],
    scanTimeBegin: '18:05',
    scanTimeEnd: '18:35'
  },
  {
    mien: 'MIỀN BẮC',
    loai: 'Thần Tài',
    scanDate: [4],
    scanTimeBegin: '18:05',
    scanTimeEnd: '18:35'
  },
  {
    mien: 'MIỀN TRUNG',
    loai: 'Bình Định',
    scanDate: [5],
    scanTimeBegin: '17:15',
    scanTimeEnd: '17:45'
  },
  {
    mien: 'MIỀN TRUNG',
    loai: 'Đà Nẵng',
    scanDate: [4],
    scanTimeBegin: '17:15',
    scanTimeEnd: '17:50'
  },
  {
    mien: 'MIỀN TRUNG',
    loai: 'Đắc Lắc',
    scanDate: [3],
    scanTimeBegin: '17:15',
    scanTimeEnd: '17:45'
  },
  {
    mien: 'MIỀN TRUNG',
    loai: 'Đắc Nông',
    scanDate: [7],
    scanTimeBegin: '17:15',
    scanTimeEnd: '17:45'
  },
  {
    mien: 'MIỀN TRUNG',
    loai: 'Gia Lai',
    scanDate: [6],
    scanTimeBegin: '17:15',
    scanTimeEnd: '17:45'
  },
  {
    mien: 'MIỀN TRUNG',
    loai: 'Khánh Hoà',
    scanDate: [4],
    scanTimeBegin: '17:15',
    scanTimeEnd: '17:50'
  },
  {
    mien: 'MIỀN TRUNG',
    loai: 'Kon Tum',
    scanDate: [8],
    scanTimeBegin: '17:15',
    scanTimeEnd: '17:45'
  },
  {
    mien: 'MIỀN TRUNG',
    loai: 'Ninh Thuận',
    scanDate: [6],
    scanTimeBegin: '17:15',
    scanTimeEnd: '17:45'
  },
  {
    mien: 'MIỀN TRUNG',
    loai: 'Phú Yên',
    scanDate: [2],
    scanTimeBegin: '17:15',
    scanTimeEnd: '17:45'
  },
  {
    mien: 'MIỀN TRUNG',
    loai: 'Quảng Bình',
    scanDate: [5],
    scanTimeBegin: '17:15',
    scanTimeEnd: '17:45'
  },
  {
    mien: 'MIỀN TRUNG',
    loai: 'Quảng Nam',
    scanDate: [3],
    scanTimeBegin: '17:15',
    scanTimeEnd: '17:45'
  },
  {
    mien: 'MIỀN TRUNG',
    loai: 'Quảng Ngãi',
    scanDate: [7],
    scanTimeBegin: '17:15',
    scanTimeEnd: '17:45'
  },
  {
    mien: 'MIỀN TRUNG',
    loai: 'Quảng Trị',
    scanDate: [5],
    scanTimeBegin: '17:15',
    scanTimeEnd: '17:45'
  },
  {
    mien: 'MIỀN TRUNG',
    loai: 'Thừa Thiên Huế',
    scanDate: [2],
    scanTimeBegin: '17:15',
    scanTimeEnd: '17:45'
  },
  {
    mien: 'MIỀN NAM',
    loai: 'An Giang',
    scanDate: [5],
    scanTimeBegin: '16:15',
    scanTimeEnd: '16:45'
  },
  {
    mien: 'MIỀN NAM',
    loai: 'Bạc Liêu',
    scanDate: [3],
    scanTimeBegin: '16:15',
    scanTimeEnd: '16:45'
  },
  {
    mien: 'MIỀN NAM',
    loai: 'Bến Tre',
    scanDate: [3],
    scanTimeBegin: '16:15',
    scanTimeEnd: '16:45'
  },
  {
    mien: 'MIỀN NAM',
    loai: 'Bình Dương',
    scanDate: [6],
    scanTimeBegin: '16:15',
    scanTimeEnd: '16:45'
  },
  {
    mien: 'MIỀN NAM',
    loai: 'Bình Phước',
    scanDate: [7],
    scanTimeBegin: '16:15',
    scanTimeEnd: '16:45'
  },
  {
    mien: 'MIỀN NAM',
    loai: 'Bình Thuận',
    scanDate: [5],
    scanTimeBegin: '16:15',
    scanTimeEnd: '16:45'
  },
  {
    mien: 'MIỀN NAM',
    loai: 'Cà Mau',
    scanDate: [2],
    scanTimeBegin: '16:15',
    scanTimeEnd: '16:45'
  },
  {
    mien: 'MIỀN NAM',
    loai: 'Cần Thơ',
    scanDate: [4],
    scanTimeBegin: '16:15',
    scanTimeEnd: '16:50'
  },
  {
    mien: 'MIỀN NAM',
    loai: 'Đà Lạt',
    scanDate: [],
    scanTimeBegin: '',
    scanTimeEnd: ''
  },
  {
    mien: 'MIỀN NAM',
    loai: 'Đồng Nai',
    scanDate: [4],
    scanTimeBegin: '16:15',
    scanTimeEnd: '16:50'
  },
  {
    mien: 'MIỀN NAM',
    loai: 'Đồng Tháp',
    scanDate: [2],
    scanTimeBegin: '16:15',
    scanTimeEnd: '16:45'
  },
  {
    mien: 'MIỀN NAM',
    loai: 'Hậu Giang',
    scanDate: [7],
    scanTimeBegin: '16:15',
    scanTimeEnd: '16:45'
  },
  {
    mien: 'MIỀN NAM',
    loai: 'Hồ Chí Minh',
    scanDate: [2, 7],
    scanTimeBegin: '16:15',
    scanTimeEnd: '16:45'
  },
  {
    mien: 'MIỀN NAM',
    loai: 'Kiên Giang',
    scanDate: [8],
    scanTimeBegin: '16:15',
    scanTimeEnd: '16:45'
  },
  {
    mien: 'MIỀN NAM',
    loai: 'Long An',
    scanDate: [7],
    scanTimeBegin: '16:15',
    scanTimeEnd: '16:45'
  },
  {
    mien: 'MIỀN NAM',
    loai: 'Sóc Trăng',
    scanDate: [4],
    scanTimeBegin: '16:15',
    scanTimeEnd: '16:50'
  },
  {
    mien: 'MIỀN NAM',
    loai: 'Tây Ninh',
    scanDate: [5],
    scanTimeBegin: '16:15',
    scanTimeEnd: '16:45'
  },
  {
    mien: 'MIỀN NAM',
    loai: 'Tiền Giang',
    scanDate: [8],
    scanTimeBegin: '16:15',
    scanTimeEnd: '16:45'
  },
  {
    mien: 'MIỀN NAM',
    loai: 'Trà Vinh',
    scanDate: [6],
    scanTimeBegin: '16:15',
    scanTimeEnd: '16:45'
  },
  {
    mien: 'MIỀN NAM',
    loai: 'Vĩnh Long',
    scanDate: [6],
    scanTimeBegin: '16:15',
    scanTimeEnd: '16:45'
  },
  {
    mien: 'MIỀN NAM',
    loai: 'Vũng Tàu',
    scanDate: [3],
    scanTimeBegin: '16:15',
    scanTimeEnd: '16:45'
  }
]
/***
 * Lịch mở thưởng theo miền. (Giá trị mặc định cho loại xo so chua xác định được thời gian mở thưởng)
 * @type {*[]}
 */
const LICH_MO_THUONG_MIEN = [
  {
    mien: 'MIỀN BẮC',
    scanTimeBegin: '18:00',
    scanTimeEnd: '18:45'
  },
  {
    mien: 'MIỀN TRUNG',
    scanTimeBegin: '17:00',
    scanTimeEnd: '17:45'
  },
  {
    mien: 'MIỀN NAM',
    scanTimeBegin: '16:00',
    scanTimeEnd: '18:45'
  }
]

// Truyền Thống
/* dac biet + 7 giai */

// Điện Toán 123
/* 3 giai - ko phan biet */

// Điện Toán 6x36
/* 6 giai - ko phan biet */

// Thần Tài
/* 1 giai */

// Mien trung & mien nam deu the nay het
/* Dac biet + 8 giai  */

export const run = () => {
  // insert mien data
  return waitDbReady()
    .then(() => {
      console.log('start migrate')
      return conn(tableName.mien)
        .insert(MIEN_DATA, 'id') // insert and return id
        .then(idList => {
          // update id for each collection
          return idList.forEach((id, index) => {
            MIEN_DATA[index].id = id
          })
        })
        .then(() => {
          // map mien
          const mienCollectionByName = _.groupBy(MIEN_DATA, 'name')
          const MAP_LICH_MO_THUONG_MIEN = _.groupBy(LICH_MO_THUONG_MIEN, 'mien')
          // map lịch mở thưởng thành key - val
          const mapLMT = _.groupBy(LICH_MO_THUONG.map(item => {
            // Lấy thời gian quét mặc định cho miền
            const defaultScanTimeByMien = MAP_LICH_MO_THUONG_MIEN[item.mien][0]
            // Tạo key để map
            item.key = item.mien.trim() + '_' + item.loai.trim()
            delete item.mien
            delete item.loai
            item.scanDate = JSON.stringify(item.scanDate)
            item.scanTimeBegin = item.scanTimeBegin.trim() === '' ? defaultScanTimeByMien.scanTimeBegin : item.scanTimeBegin
            item.scanTimeEnd = item.scanTimeEnd.trim() === '' ? defaultScanTimeByMien.scanTimeEnd : item.scanTimeEnd
            return item
          }), 'key')
          // cập nhật lịch mở thưởng cho loại xs
          let LoaiArr = LOAI_DATA.map(item => {
            const loaiExt = mapLMT[item.mien.trim() + '_' + item.name.trim()][0]
            delete loaiExt.key
            return {
              ...item,
              ...loaiExt
            }
          })
          // update mienId for LoaiArr. map (value, index|key, collection)
          LoaiArr = LoaiArr.map((coll) => {
            coll.mienId = mienCollectionByName[coll.mien][0].id
            delete coll.mien
            return coll
          })
          return conn(tableName.loai).insert(LoaiArr, 'id')
          // .then(idList => {
          //   // update id for each collection
          //   return idList.forEach((id, index) => {
          //     LoaiArr[index].id = id
          //   })
          // })
        })
    })
    .then(() => {
      // select giai to check insert data
      return conn('mien').select()
        .then(rs => {
          console.log('mien: \n', JSON.stringify(rs, null, 4))
          return true
        })
        .then(() => {
          return conn('loai').select()
            .then(rs => {
              console.log('loai: \n', JSON.stringify(rs, null, 4))
              return true
            })
        })
    })
    .catch(err => {
      console.log(err.stack)
    })
}
