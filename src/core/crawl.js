import {
  ketquaModel,
  configCrawlModel
}
  from '../model'
import { Api } from '../api/ketqua.net'
import _ from 'lodash'
import schedule from 'node-schedule'
import config from '../config'
import moment from 'moment'
import LogDebug from '../helper/logdebug'
const debug = new LogDebug('CRAW')

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
    this._key = 'ketqua.net'
    this.config = null
    this._update = false
    this._loadConfig()
  }

  _loadConfig () {
    configCrawlModel.find({ key: this._key, loaiId: this.cateInfo.id })
      .then(res => {
        if (res && res instanceof Array && res.length > 0) {
          this.config = res[0]
          return
        }
        console.error('Cannot load config for cate: ', this.cateInfo.name)
        if (this.crawlSchedule) {
          this.crawlSchedule.cancel()
        }
      })
  }

  /**
   * Func create schedule run crawl data every 5 minutes
   */
  createScheduleCrawl = (runNow = false) => {
    if (runNow) {
      // wait load config
      return new Promise(resolve => {
        const loop = () => {
          if (this.config) {
            return resolve()
          }
          setTimeout(loop, 10)
        }
        loop()
      })
        .then(() => {
          debug(`   [${this.cateInfo.name}] The task ran on ${Date()}`)
          return this._scan()
        })
    }
    this.crawlSchedule = schedule.scheduleJob('*/5 * * * *', () => {
      debug(`   [${this.cateInfo.name}] The scheduled crawl task ran on ${Date()}`)
      this._scan()
    })
    debug(`[${this.cateInfo.name}] The crawl schedule has been initialized on ${Date()}`)
  }

  /**
   * Crawl data online
   * @private
   * @returns {Promise.<TResult>}
   */
  _scan () {
    if (!this.config) {
      debug(`   [${this.cateInfo.name}] config not loaded yet.`)
      return false  // Promise.resolve(false)
    }
    const api = new Api()
    return Promise.resolve()
      .then(() => {
        if (this._update) {
          return api.reloadResult(this.config.code)
        }
        this._update = true
        // get full for first run crawl
        return api.reloadResult(this.config.code, true)
        // return api.crawlByDay(this.config.url, this.date)
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
        console.error(err.stack)
        // todo: may be write error log into file
      })
  }

  /**
   * Update result to final data
   * @param res {Object}
   * @private
   */
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

  /**
   * Check & stop schedule if done
   * @param isComplete
   * @returns {boolean}
   * @private
   */
  _checkStop (isComplete) {
    const now = moment()
    const end = moment(this.cateInfo.scanTimeEnd, 'HH:mm')
    if (now >= end || isComplete) {
      debug(`   [${this.cateInfo.name}] The scheduled crawl task stopped on ${Date()}`)
      this.crawlSchedule && this.crawlSchedule.cancel()
    }
    return true
  }

  /***
   * ham xu ly du lieu lay dc va luu vao db
   * @returns {Promise.<TResult>}
   * @private
   */
  _save () {
    return Promise.resolve()
      .then(() => {
        // gen insert data
        const insertData = []
        // Duyet qua cac giai
        _.each(this.finalData, (valList, key) => {
          // duyet qua cac ket qua cua giai
          _.each(valList, (val) => {
            insertData.push({
              value: val,
              date: moment(this.date, config.inputFormatDate).format('X'),
              loaiId: this.cateInfo.id,
              giaiId: key
            })
          })
        })
        return ketquaModel.insert(insertData)
      })
  }
}
