/* eslint-disable no-undef */
process.env.DEBUG = 'ketquanet'
import { expect } from 'chai'
import { Api } from '../ketqua.net'
import helper from './helper'

const debug = require('debug')('testCrawl')

describe('crawl ketqua.net', () => {
  let api
  before(() => {
    api = new Api()
    helper.addNockServer()
  })
  it('crawl: xo so truyen thong ngay 02/10/2016', () => {
    // api.request.charles = true
    return api.crawlByDay('/xo-so-truyen-thong.php', '10/02/2016')
      .then(res => {
        debug(JSON.stringify(res, null, 4))
        expect(res).to.deep
          .equal({
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
          })
      })
  })
})
/* eslint-enable no-undef */
