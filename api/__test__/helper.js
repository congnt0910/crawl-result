import nock from 'nock'
import fs from 'fs'
import path from 'path'

const host = 'http://ketqua.net'

const addNockServer = () => {
  nock(host)
    .get('/xo-so-truyen-thong.php?ngay=02-10-2016')
    .reply(200, fs.readFileSync(path.join(__dirname, '/mockData.htm'), 'utf8'))
}

export default {
  host,
  addNockServer
}
