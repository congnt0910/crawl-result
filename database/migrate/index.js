import _ from 'lodash'
import { conn, tableName } from '../knex'

const MIEN_DATA = [
  {name: 'MIỀN BẮC'},
  {name: 'MIỀN TRUNG'},
  {name: 'MIỀN NAM'}
]

const LOAI_DATA = {
  /* dac biet + 7 giai */
  '0': {
    group: 'MIỀN BẮC',
    name: 'Truyền Thống',
    url: '/xo-so-truyen-thong/',
    time: '18:15'
  },
  /* 3 giai - ko phan biet */
  '1': {
    group: 'MIỀN BẮC',
    name: 'Điện Toán 123',
    url: '/xo-so-dien-toan-123/',
    time: '18:05'
  },
  /* 6 giai - ko phan biet */
  '2': {
    group: 'MIỀN BẮC',
    name: 'Điện Toán 6x36',
    url: '/xo-so-dien-toan-6x36/',
    time: ''
  },
  /* 1 giai */
  '3': {
    group: 'MIỀN BẮC',
    name: 'Thần Tài',
    url: '/xo-so-than-tai/',
    time: '18:05'
  },
  /* Dac biet + 8 giai . Mien trung & mien nam deu the nay het */
  '4': {
    group: 'MIỀN TRUNG',
    name: 'Bình Định',
    url: '/xo-so-binh-dinh/',
    time: ''
  },
  '5': {
    group: 'MIỀN TRUNG',
    name: 'Đà Nẵng',
    url: '/xo-so-da-nang/',
    time: ''
  },
  '6': {
    group: 'MIỀN TRUNG',
    name: 'Đắc Lắc',
    url: '/xo-so-dac-lac/',
    time: '17:15'
  },
  '7': {
    group: 'MIỀN TRUNG',
    name: 'Đắc Nông',
    url: '/xo-so-dac-nong/',
    time: ''
  },
  '8': {
    group: 'MIỀN TRUNG',
    name: 'Gia Lai',
    url: '/xo-so-gia-lai/',
    time: ''
  },
  '9': {
    group: 'MIỀN TRUNG',
    name: 'Khánh Hoà',
    url: '/xo-so-khanh-hoa/',
    time: ''
  },
  '10': {
    group: 'MIỀN TRUNG',
    name: 'Kon Tum',
    url: '/xo-so-kon-tum/',
    time: ''
  },
  '11': {
    group: 'MIỀN TRUNG',
    name: 'Ninh Thuận',
    url: '/xo-so-ninh-thuan/',
    time: ''
  },
  '12': {
    group: 'MIỀN TRUNG',
    name: 'Phú Yên',
    url: '/xo-so-phu-yen/',
    time: ''
  },
  '13': {
    group: 'MIỀN TRUNG',
    name: 'Quảng Bình',
    url: '/xo-so-quang-binh/',
    time: ''
  },
  '14': {
    group: 'MIỀN TRUNG',
    name: 'Quảng Nam',
    url: '/xo-so-quang-nam/',
    time: '17:15'
  },
  '15': {
    group: 'MIỀN TRUNG',
    name: 'Quảng Ngãi',
    url: '/xo-so-quang-ngai/',
    time: ''
  },
  '16': {
    group: 'MIỀN TRUNG',
    name: 'Quảng Trị',
    url: '/xo-so-quang-tri/',
    time: ''
  },
  '17': {
    group: 'MIỀN TRUNG',
    name: 'Thừa Thiên Huế',
    url: '/xo-so-thua-thien-hue/',
    time: ''
  },
  '18': {
    group: 'MIỀN NAM',
    name: 'An Giang',
    url: '/xo-so-an-giang/',
    time: ''
  },
  '19': {
    group: 'MIỀN NAM',
    name: 'Bạc Liêu',
    url: '/xo-so-bac-lieu/',
    time: '16:15'
  },
  '20': {
    group: 'MIỀN NAM',
    name: 'Bến Tre',
    url: '/xo-so-ben-tre/',
    time: '16:15'
  },
  '21': {
    group: 'MIỀN NAM',
    name: 'Bình Dương',
    url: '/xo-so-binh-duong/',
    time: ''
  },
  '22': {
    group: 'MIỀN NAM',
    name: 'Bình Phước',
    url: '/xo-so-binh-phuoc/',
    time: ''
  },
  '23': {
    group: 'MIỀN NAM',
    name: 'Bình Thuận',
    url: '/xo-so-binh-thuan/',
    time: ''
  },
  '24': {
    group: 'MIỀN NAM',
    name: 'Cà Mau',
    url: '/xo-so-ca-mau/',
    time: ''
  },
  '25': {
    group: 'MIỀN NAM',
    name: 'Cần Thơ',
    url: '/xo-so-can-tho/',
    time: ''
  },
  '26': {
    group: 'MIỀN NAM',
    name: 'Đà Lạt',
    url: '/xo-so-da-lat/',
    time: ''
  },
  '27': {
    group: 'MIỀN NAM',
    name: 'Đồng Nai',
    url: '/xo-so-dong-nai/',
    time: ''
  },
  '28': {
    group: 'MIỀN NAM',
    name: 'Đồng Tháp',
    url: '/xo-so-dong-thap/',
    time: ''
  },
  '29': {
    group: 'MIỀN NAM',
    name: 'Hậu Giang',
    url: '/xo-so-hau-giang/',
    time: ''
  },
  '30': {
    group: 'MIỀN NAM',
    name: 'Hồ Chí Minh',
    url: '/xo-so-ho-chi-minh/',
    time: ''
  },
  '31': {
    group: 'MIỀN NAM',
    name: 'Kiên Giang',
    url: '/xo-so-kien-giang/',
    time: ''
  },
  '32': {
    group: 'MIỀN NAM',
    name: 'Long An',
    url: '/xo-so-long-an/',
    time: ''
  },
  '33': {
    group: 'MIỀN NAM',
    name: 'Sóc Trăng',
    url: '/xo-so-soc-trang/',
    time: ''
  },
  '34': {
    group: 'MIỀN NAM',
    name: 'Tây Ninh',
    url: '/xo-so-tay-ninh/',
    time: ''
  },
  '35': {
    group: 'MIỀN NAM',
    name: 'Tiền Giang',
    url: '/xo-so-tien-giang/',
    time: ''
  },
  '36': {
    group: 'MIỀN NAM',
    name: 'Trà Vinh',
    url: '/xo-so-tra-vinh/',
    time: ''
  },
  '37': {
    group: 'MIỀN NAM',
    name: 'Vĩnh Long',
    url: '/xo-so-vinh-long/',
    time: ''
  },
  '38': {
    group: 'MIỀN NAM',
    name: 'Vũng Tàu',
    url: '/xo-so-vung-tau/',
    time: '16:15'
  }
}

export const run = () => {
  // insert mien data
  return conn(tableName.mien)
    .insert(MIEN_DATA, 'id') // insert and return id
    .then(idList => {
      // update id for each collection
      return idList.forEach((id, index) => {
        MIEN_DATA[index].id = id
      })
    })
    .then(() => {
      const mienCollectionByName = _.groupBy(MIEN_DATA, 'name')
      // update mienId for LOAI_DATA. map (value, index|key, collection)
      const LoaiArr = LOAI_DATA.map((key, coll) => {
        coll.mien_id = mienCollectionByName[coll.group].id
        delete coll.group
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

}
