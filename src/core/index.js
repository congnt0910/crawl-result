// đã có:
//    - api lấy kết quả xổ số từ trang ketqua.net
//    - config connect to db
// TODO: viết hàm lưu kết quả xs lấy đc vào db
export const processKQ = (KQ, mien, loai) => {
  return Promise.resolve(KQ)
}

export const doProcessKQ = () => {
  // todo: select mien, loai from db
  // todo: call api crawl data

  let kq, mien, loai
  processKQ(kq, mien, loai)
}

// TODO: nhận đầu vào là 1 này -> Quét lấy dữ liệu tất cả loại xổ số mở thưởng ngày đó lưu vào db

// TODO: tao cron job
// - research schedule in nodejs
// - apply schedule to crawl
