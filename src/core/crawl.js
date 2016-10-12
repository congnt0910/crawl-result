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
  createScheduleCrawl = () => {
    this.crawlSchedule = schedule.scheduleJob('*/5 * * * *', () => {
      console.log('The scheduled crawl task ran: ', this.cateInfo.name)
      debug('The scheduled crawl task ran: ', this.cateInfo.name, Date())
      return this._scan()
    })
    console.log('The crawl schedule has been initialized')
    debug('The crawl schedule has been initialized', Date())
  }

  /**
   * Crawl data online
   * @private
   * @returns {Promise.<TResult>}
   */
  _scan () {
    if (!this.config) {
      console.log('config not loaded yet.')
      return false  // Promise.resolve(false)
    }
    const api = new Api()
    return Promise.resolve()
      .then(() => {
        if (this._update) {
          return api.reloadResult(this.config.code)
        }
        this._update = true
        debug('get full data', this.config.url, this.date)
        // get full for first run crawl
        return api.crawlByDay(this.config.url, this.date)
      })
      .then(res => {
        debug('data: ', JSON.stringify(res, null, 4))
        return this._compareData(res)
      })
      .then(() => {
        debug('save')
        return this._save()
      })
      .then(() => {
        const isComplete = api.finishStatus
        debug('check complete: ', isComplete)
        return this._checkStop(isComplete)
      })
      .catch(err => {
        console.error(err.stack)
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
    debug('_checkStop: ', now.toString(), end.toString(), now >= end, isComplete)
    if (now >= end || isComplete) {
      debug('The scheduled crawl task stopped: ', Date())
      this.crawlSchedule.cancel()
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
      .then(res => {
        // gen insert data
        const insertData = []
        // Duyet qua cac giai
        _.each(this.finalData, (valList, key) => {
          // duyet qua cac ket qua cua giai
          _.each(valList, (val, idx) => {
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
