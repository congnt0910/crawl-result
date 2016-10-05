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

const defautStruct = () => {
  return {
    mien: 'MIỀN BẮC',
    loai: 'Truyền Thống',
    scanDate: [],
    scanTimeBegin: '',
    scanTimeEnd: ''
  }
}

let lichMoThuong = []
LOAI_DATA.map(item => {
  const obj = defautStruct()
  obj.mien = item.mien
  obj.loai = item.name
  lichMoThuong.push(obj)
})

console.log(lichMoThuong)

export default {}
