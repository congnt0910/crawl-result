import { _processKQ } from '../scan'
import { conn, tableName, waitDbReady } from '../../database/knex'

import LogDebug from '../../helper/logdebug'
const _debug = new LogDebug('TEST')

const kq = {
  'Đặc biệt': [
    '78904'
  ],
  'Giải nhất': [
    '53322'
  ],
  'Giải nhì': [
    '95691',
    '42488'
  ],
  'Giải ba': [
    '06838',
    '40436',
    '34972',
    '44242',
    '14491',
    '68910'
  ],
  'Giải tư': [
    '7696',
    '5964',
    '1906',
    '16098'
  ],
  'Giải năm': [
    '8698',
    '6775',
    '7809',
    '9280',
    '5589',
    '1982'
  ],
  'Giải sáu': [
    '621',
    '661',
    '567'
  ],
  'Giải bảy': [
    '80',
    '66',
    '67',
    '00'
  ]
}

export const run = () => {
  return waitDbReady()
    .then(() => {
      _debug('start process')
      return conn(tableName.mien).select()
    })
    .then(() => {
      const id = 1
      return conn(tableName.loai).where({id}).first()
    })
    .then(loai => {
      return _processKQ(kq, loai, '10/02/2016')
    })
    .catch(err => {
      console.log(err.stack)
    })
}
