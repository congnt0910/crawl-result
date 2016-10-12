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
  it('crawlByDay: xo so truyen thong ngay 02/10/2016', () => {
    // api.request.charles = true
    return api.crawlByDay('/xo-so-truyen-thong.php', '10/02/2016')
      .then(res => {
        debug(JSON.stringify(res, null, 4))
        expect(res).to.deep
          .equal({
            '0': [
              '78904'
            ],
            '1': [
              '53322'
            ],
            '2': [
              '95691',
              '42488'
            ],
            '3': [
              '06838',
              '40436',
              '34972',
              '44242',
              '14491',
              '68910'
            ],
            '4': [
              '7696',
              '5964',
              '1906',
              '16098'
            ],
            '5': [
              '8698',
              '6775',
              '7809',
              '9280',
              '5589',
              '1982'
            ],
            '6': [
              '621',
              '661',
              '567'
            ],
            '7': [
              '80',
              '66',
              '67',
              '00'
            ]
          })
      })
  })
  it('reloadResult: xo so truyen thong ngay 11/10/2016', () => {
    // api.request.charles = true
    return api.reloadResult('mb')
      .then(res => {
        debug(JSON.stringify(res, null, 4))
        expect(res).to.equal(-2)
      })
  })
})

describe('reloadResult', () => {
  let api
  before(() => {
    api = new Api()
    helper.addNockForReloadResultNow()
  })
  it('reloadResult: xo so truyen thong ngay NOW', () => {
    // api.request.charles = true
    return api.reloadResult('mb')
      .then(res => {
        expect(res).to.deep.equal({
          '0': [
            '60300'
          ],
          '1': [
            '91556'
          ],
          '2': [
            '21604',
            '73340'
          ],
          '3': [
            '14432',
            '60180',
            '98021',
            '26998',
            '63602',
            '17996'
          ],
          '4': [
            '5443',
            '9189',
            '7573',
            '2539'
          ],
          '5': [
            '6290',
            '3186',
            '5838',
            '7155',
            '6819',
            '9462'
          ],
          '6': [
            '430',
            '490',
            '555'
          ],
          '7': [
            '04',
            '16',
            '88',
            '17'
          ]
        })
      })
  })
})
/* eslint-enable no-undef */
