// set NODE_ENV=DEV&&set DEBUG=ketquanet&&

// test rawData/genStructLichMoThuong
// import genStructLichMoThuong from './rawData/genStructLichMoThuong'

process.env.NODE_ENV = 'TEST'
import {run} from './database/migrate'
run()
