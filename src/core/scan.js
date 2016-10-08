import loaiModel from '../model/loai'
import giaiModel from '../model/giai'
import ketquaModel from '../model/ketqua'
import { Api } from '../api/ketqua.net'
import _ from 'lodash'

/***
 * ham xu ly du lieu lay dc va luu vao db
 * @param KQ {Object} - ket qua crawl
 * @param loai {Object} - thong tin loai xs
 * @param date {string} - Ngay xs mo thuong
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

/***
 * Crawl data online
 * @function
 * @param date {string} - Ngay lay du lieu
 * @param loaiId {int} - loai xs can lay du lieu
 * @returns {Promise.<TResult>}
 */
const scan = (date, loaiId) => {
  const api = new Api()
  let loaiInfo
  return loaiModel.getById(loaiId)
    .then(res => {
      if (!res) throw new Error('Not found loaiId: ', loaiId)
      loaiInfo = res
      return api.crawlByDay(res.url, date)
    })
    .then(res => {
      return _processKQ(res, loaiInfo, date)
    })
}

/**
 * Scan module. Crawl data online
 * @exports core/scan
 */
export {
  /**
   * Crawl data online
   * @function
   * @param date {string} - Ngay lay du lieu
   * @param loaiId {int} - loai xs can lay du lieu
   * @returns {Promise.<TResult>}
   */
  scan,
  /**
   * ham xu ly du lieu lay dc va luu vao db
   * @param KQ {Object} - ket qua crawl
   * @param loai {Object} - thong tin loai xs
   * @param date {string} - Ngay xs mo thuong
   * @returns {Promise.<TResult>}
   * @private
   */
  _processKQ
}
