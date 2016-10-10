import moment from 'moment'
import cheerio from 'cheerio'
import HttpRequest from '../../helper/httpRequest'
import config from '../../config'

const debug = require('debug')('ketquanet')

/**
 *  Api crawl data from ketqua_net
 */
export class Api {
  constructor (props) {
    this.outputFormatDate = 'DD-MM-YYYY' // format date use to crawl process
    this.request = new HttpRequest()
    this.server = 'http://ketqua.net'
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
        $rows.get().forEach(function (tr) {
          // get all cell (td) in row
          let $tds = $(tr).find('td')
          const $giai = $tds.eq(0)
          $tds = $tds.not($giai)
          const tmpGiai = $giai.text().trim()
          if (tmpGiai !== '') giai = tmpGiai
          $tds.get().forEach(function (td) {
            const $td = $(td)
            data[giai] = data[giai] || []
            data[giai].push($td.text().trim())
          })
        })
        debug(JSON.stringify(data, null, 4))
        return data // crawl data complete
      })
  }
}
