import Crawl from '../crawl'
import { waitDbReady } from '../../database/knex'

import LogDebug from '../../helper/logdebug'
const _debug = new LogDebug('TEST')

const cateInfo = {
  'id': 1,
  'name': 'Truyền Thống',
  'scanDate': '[2,3,4,5,6,7,8]',
  'scanTimeBegin': '18:15',
  'scanTimeEnd': '18:45',
  'useScanTime': false,
  'url': null,
  'mienId': 1,
  'created_at': '2016-10-11T16:21:11.117Z',
  'updated_at': '2016-10-11T16:21:11.117Z'
}
let api
export const run = () => {
  return waitDbReady()
    .then(() => {
      _debug('start process')
      api = new Crawl('10/11/2016', cateInfo)
      return api.createScheduleCrawl()
    })
    .catch(err => {
      console.error(err.stack)
    })
}
