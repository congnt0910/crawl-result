import giaiModel from '../model/giai'
import ketquaModel from '../model/ketqua'
import { Api } from '../api/ketqua.net'
import _ from 'lodash'
import schedule from 'node-schedule'

// TODO: determine when to stop

/***
 * Func create schedule run crawl data every 5 minutes
 * @param date {string} Date to crawl
 * @param cateInfo {Object}
 */
const doProcessScheduleCrawl = (date, cateInfo) => {
  schedule.scheduleJob('*/5 * * * *', () => {
    scan(date, cateInfo)
  })
  console.log('The main schedule has been initialized')
}

/***
 * Crawl data online
 * @function
 * @param date {string} Ngay lay du lieu. Format: MM/DD/YYYY
 * @param cateInfo {Object} loai xs can lay du lieu
 * @returns {Promise.<TResult>}
 */
const scan = (date, cateInfo) => {
  const api = new Api()
  return Promise.resolve()
    .then(() => {
      return api.crawlByDay(cateInfo.url, date)
    })
    .then(res => {
      return _processKQ(res, cateInfo, date)
    })
}

/***
 * ham xu ly du lieu lay dc va luu vao db
 * @param KQ {Object} ket qua crawl
 * @param loai {Object} thong tin loai xs
 * @param date {string} Ngay xs mo thuong
 * @returns {Promise.<TResult>}
 * @private
 */
const _processKQ = (KQ, loai, date) => {
  let giai
  return giaiModel.getAll()
    .then(res => {
      giai = res
      // map by name
      const mapGiai = _.groupBy(giai, 'name')
      // gen insert data
      const insertData = []
      // Duyet qua cac giai
      _.each(KQ, (valList, key) => {
        const giaiInfo = mapGiai[key][0]
        // duyet qua cac ket qua cua giai
        _.each(valList, (val, idx) => {
          insertData.push({
            value: val,
            date,
            loaiId: loai.id,
            giaiId: giaiInfo.id
          })
        })
      })
      return ketquaModel.insert(insertData)
    })
}

/**
 * Scan module. Crawl data online
 * @exports core/scan
 */
export {
  /**
   * Func create schedule run crawl data every 5 minutes
   * @param date {string} Date to crawl
   * @param cateInfo {Object}
   * @function
   */
  doProcessScheduleCrawl,
  /**
   * Crawl data online
   * @function
   * @param date {string} Ngay lay du lieu. Format: MM/DD/YYYY
   * @param cateInfo {Object} loai xs can lay du lieu
   * @returns {Promise.<TResult>}
   */
  scan,
  /**
   * ham xu ly du lieu lay dc va luu vao db
   * @param KQ {Object} ket qua crawl
   * @param loai {Object} thong tin loai xs
   * @param date {string} Ngay xs mo thuong. Format: MM/DD/YYYY
   * @returns {Promise.<TResult>}
   * @private
   */
  _processKQ
}
