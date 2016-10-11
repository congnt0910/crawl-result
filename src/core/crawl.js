import ketquaModel from '../model/ketqua'
import { Api } from '../api/ketqua.net'
import _ from 'lodash'
import schedule from 'node-schedule'
import moment from 'moment'

// TODO: determine when to stop

/**
 * Crawl data online
 */
export default class Crawl {
  constructor (date, cateInfo) {
    this.date = date
    this.cateInfo = cateInfo
    this.finalData = {}
    this.crawlSchedule = null
  }

  /**
   * Func create schedule run crawl data every 5 minutes
   * @private
   */
  createScheduleCrawl = () => {
    this.crawlSchedule = schedule.scheduleJob('*/5 * * * *', () => {
      console.log('The scheduled crawl task ran: ', this.cateInfo.name)
      return this._scan()
    })
    console.log('The crawl schedule has been initialized')
  }

  /**
   * Crawl data online
   * @private
   */
  _scan () {
    const api = new Api()
    return Promise.resolve()
      .then(() => {
        return api.crawlByDay(this.cateInfo.url, this.date)
      })
      .then(res => {
        return this._compareData(res)
      })
      .then(() => {
        return this._save()
      })
      .then(() => {
        const isComplete = api.finishStatus
        return this._checkStop(isComplete)
      })
      .catch(err => {
        console.error(err)
        // todo: may be write error log into file
      })
  }

  _compareData (res) {
    _.each(res, (val, key) => {
      const tmp = this.finalData[key] = this.finalData[key] || []
      _.each(val, (item) => {
        if (tmp.indexOf(item) === -1) {
          tmp.push(item)
        }
      })
    })
  }

  _checkStop (isComplete) {
    const now = moment()
    const end = moment(this.cateInfo.scanTimeEnd, 'HH:mm')
    if (now >= end || isComplete) {
      this.crawlSchedule.cancel()
    }
  }

  /***
   * ham xu ly du lieu lay dc va luu vao db
   * @returns {Promise.<TResult>}
   * @private
   */
  _save () {
    return Promise.resolve()
      .then(res => {
        // gen insert data
        const insertData = []
        // Duyet qua cac giai
        _.each(this.finalData, (valList, key) => {
          // duyet qua cac ket qua cua giai
          _.each(valList, (val, idx) => {
            insertData.push({
              value: val,
              date: this.date,
              loaiId: this.cateInfo.id,
              giaiId: key
            })
          })
        })
        return ketquaModel.insert(insertData)
      })
  }
}
