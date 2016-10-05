/* eslint-disable no-undef */
// import { expect } from 'chai'
import { processKQBeforeInsert } from '../index'
import { conn, tableName } from '../../database/knex'
const debug = require('debug')('processKQBeforeInsert')

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
let mien, loai
describe('test processKQBeforeInsert', () => {
  before(() => {
    // get mien, loai
    return conn(tableName.mien).select()
      .then(rs => {
        mien = rs
        return true
      })
      .then(() => {
        return conn(tableName.loai).select()
      })
      .then(rs => {
        loai = rs
        return true
      })
  })
  it('run', () => {
    processKQBeforeInsert(kq, mien, loai)
      .then(rs => {
        debug(JSON.stringify(rs, null, 4))
      })
  })
})
/* eslint-enable no-undef */
