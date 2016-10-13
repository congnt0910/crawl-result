import moment from 'moment'
import { loaiModel } from '../model'
import Crawl from '../core/crawl'
import { waitDbReady } from '../database/knex'

import LogDebug from '../helper/logdebug'
const debug = new LogDebug('TEST')

const global = {}

// const start = '01/01/2010' // MM/DD/YYYY
// const end = '01/01/2012'

const start = '10/10/2016' // MM/DD/YYYY
const end = '10/13/2016'

let currentDate
// get all cate
Promise.resolve()
  .then(waitDbReady)
  .then(() => {
    return loaiModel.getAll()
  })
  .then(res => {
    global.cate = res
    // group by day of week
    global.cateMapByDay = {}
    for (let i = 1; i <= 8; i++) {
      global.cateMapByDay[i] = res.filter(item => {
        const scanDate = JSON.parse(item.scanDate)
        return scanDate.indexOf(i) > -1
      })
    }
    // start crawl
    return new Promise((resolve, reject) => {
      const loop = () => {
        if (currentDate && currentDate.format('MM/DD/YYYY') === end) {
          // stop
          return resolve()
        }
        if (!currentDate) {
          currentDate = moment(start, 'MM/DD/YYYY')
        } else {
          currentDate = currentDate.add(1, 'day') // get next day
        }
        debug('Crawl data on ', currentDate.format('MM/DD/YYYY'))
        let dayOfWeek = currentDate.day() //  Sunday as 0 and Saturday as 6
        if (dayOfWeek === 0) {
          dayOfWeek = 8 // sunday
        } else {
          dayOfWeek += 1
        }
        debug(`   Have ${global.cateMapByDay[dayOfWeek].length} cate in day:`)

        return Promise.all(global.cateMapByDay[dayOfWeek]
          .map(cateInfo => {
            debug(`       - ${cateInfo.name}`)
            const api = new Crawl(currentDate.format('MM/DD/YYYY'), cateInfo)
            return api.createScheduleCrawl(true)
          }))
          .then(() => {
            debug('All cate in day complete\n')
            setTimeout(loop, 20)
          })
          .catch(err => reject(err))
      }
      loop()
    })
  })
  .catch(err => {
    console.error(err.stack)
    process.exit(0)
  })
