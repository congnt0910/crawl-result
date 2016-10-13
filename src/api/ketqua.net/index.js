import moment from 'moment'
import cheerio from 'cheerio'
import HttpRequest from '../../helper/httpRequest'
import config from '../../config'
import _ from 'lodash'
const debug = require('debug')('ketquanet')
const GIAI_DATA = [
  {id: 0, name: 'Đặc biệt'},
  {id: 1, name: 'Giải nhất'},
  {id: 2, name: 'Giải nhì'},
  {id: 3, name: 'Giải ba'},
  {id: 4, name: 'Giải tư'},
  {id: 5, name: 'Giải năm'},
  {id: 6, name: 'Giải sáu'},
  {id: 7, name: 'Giải bảy'},
  {id: 8, name: 'Giải tám'}
]
const giaiMap = _.groupBy(GIAI_DATA, 'name')

/**
 *  Api crawl data from ketqua_net
 */
export class Api {
  constructor () {
    this.outputFormatDate = 'DD-MM-YYYY' // format date use to crawl process
    this.request = new HttpRequest()
    this.server = 'http://ketqua.net'
    this.curLen = 0
    this.finishStatus = false
  }

  /**
   * crawlByDay
   * @param uri {string} path url to crawl
   * @param date {string} Ngay crawl data. Format: MM/DD/YYYY
   */
  crawlByDay (uri, date) {
    // check validate date
    date = moment(date, config.inputFormatDate).format(this.outputFormatDate)
    if (date === 'Invalid Date') return Promise.reject(new Error('Invalid Date'))
    const post = {
      ngay: date
    }
    const url = this.server + uri
    return this.request.get(url, post,
      {
        transform: function (body) {
          return cheerio.load(body)
        }
      })
      .then($ => {
        const $body = $('body')
        if ($body.length === 0) {
          throw new Error('Failed')
        }
        // get data table
        const $table = $body.find('table.kqvertimarginw')
        // get all row in body table
        const $rows = $table.find('tbody tr')

        // get head row of table
        const $thead = $table.find('thead tr')
        const thNgay = $thead.text().trim()
        const index = thNgay.lastIndexOf(' ')
        // extracts the date from title
        const ngayKq = thNgay.substring(index).trim()

        // check date
        if (date !== ngayKq) {
          debug('empty data!', `date request: ${date}, date received: ${ngayKq}`)
          return {}
        }

        const data = {} // store data crawl
        let giai = ''
        // error when cate is than tai, 123, 636
        $rows.get().forEach(function (tr) {
          // get all cell (td) in row
          let $tds = $(tr).find('td')
          const $giai = $tds.eq(0)
          $tds = $tds.not($giai)
          const tmpGiai = $giai.text().trim()
          if (tmpGiai !== '') giai = tmpGiai
          const idGiai = giaiMap[giai][0].id
          $tds.get().forEach(function (td) {
            const $td = $(td)
            data[idGiai] = data[idGiai] || []
            data[idGiai].push($td.text().trim())
          })
        })
        const idGiai = giaiMap['Đặc biệt'][0].id
        if (data[idGiai].length > 0) {
          this.finishStatus = true
        }
        debug(JSON.stringify(data, null, 4))
        return data // crawl data complete
      })
  }

  reloadResult (targetCode, ignoreCheckDate) {
    const reloadUrl = `${this.server}/pre_loads/kq-${targetCode}.raw?t=${Date.now()}`
    const errorConfig = {
      url: reloadUrl,
      func: 'reloadResult'
    }
    return this.request.get(reloadUrl)
      .then(res => {
        const resultParts = res.split(';')
        const currentTimeStamp = Date.now()
        const loadedTimeStemp = parseInt(resultParts[0] + '000')
        const difference = currentTimeStamp - loadedTimeStemp
        // out date range
        if (!ignoreCheckDate && (difference < 0 || difference > 5 * 60 * 1000)) {
          return -2
        }
        const parts = res.split(';')
        const bareDigitString = parts.slice(1, parts.length).join('').replace(/[^0-9*]/g, '')
        if (this.curLen < bareDigitString.length) {
          this.curLen = bareDigitString.length
        } else {
          console.log('not long enough')
          return -1
        }
        const lotoList = {}
        const len = resultParts.length
        _.each(resultParts, (curPrize, i) => {
          if (i === 0) return
          const prizeIndex = len - i - 1
          if (curPrize.length === 0) {
            return
          }
          const pizeParts = curPrize.split('-')
          _.each(pizeParts, (currentPrize) => {
            if (currentPrize.length === 0) {
              return
            }
            if (/^\**$/.test(currentPrize)) {
              return
            }
            if (/^[0-9]*$/.test(currentPrize)) {
              lotoList[prizeIndex] = lotoList[prizeIndex] || []
              lotoList[prizeIndex].push(currentPrize)
              if (prizeIndex === 0) {
                this.finishStatus = true
              }
            }
          })
        })
        return lotoList
      })
      .catch(err => {
        err.extendInfo = errorConfig
        throw err
      })
  }
}
