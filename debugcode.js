import './bin/env'

import LogDebug from './helper/logdebug'
const debug = new LogDebug('TEST')
debug('shit')
// test rawData/genStructLichMoThuong
// import genStructLichMoThuong from './rawData/genStructLichMoThuong'

// insert default data (migrate)
// import { run } from './database/migrate'
// run()

// test ham su ly du lieu kq truoc khi insert
import { run } from './core/__test__'
run()

