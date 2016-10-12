import nock from 'nock'
import fs from 'fs'
import path from 'path'
import moment from 'moment'
const host = 'http://ketqua.net'

const dateNow = moment()
const nowInt = dateNow.format('X')

const addNockServer = () => {
  nock(host)
    .get('/xo-so-truyen-thong.php?ngay=02-10-2016')
    .reply(200, fs.readFileSync(path.join(__dirname, '/mockData.htm'), 'utf8'))
    .filteringPath(pathUrl => {
      const tmp = pathUrl.indexOf('?t=')
      if (tmp > -1) {
        pathUrl = pathUrl.substring(0, tmp)
      }
      return pathUrl
    })

    .get('/pre_loads/kq-mb.raw').once() // 11-10-2016
    .reply(200, '1476185235;;04-16-88-17;430-490-555;6290-3186-5838-7155-6819-9462;5443-9189-7573-2539;14432-60180-98021-26998-63602-17996;21604-73340;91556;60300')

    .get('/pre_loads/kq-mb.raw').twice() // now
    .reply(200, `${nowInt};;04-16-88-17;430-490-555;6290-3186-5838-7155-6819-9462;5443-9189-7573-2539;14432-60180-98021-26998-63602-17996;21604-73340;91556;60300`)
}

const addNockForReloadResultNow = () => {
  nock(host)
    .filteringPath(pathUrl => {
      const tmp = pathUrl.indexOf('?t=')
      if (tmp > -1) {
        pathUrl = pathUrl.substring(0, tmp)
      }
      return pathUrl
    })
    .get('/pre_loads/kq-mb.raw').twice() // now
    .reply(200, `${nowInt};;04-16-88-17;430-490-555;6290-3186-5838-7155-6819-9462;5443-9189-7573-2539;14432-60180-98021-26998-63602-17996;21604-73340;91556;60300`)
}

export default {
  host,
  addNockServer,
  addNockForReloadResultNow
}
