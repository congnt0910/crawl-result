import env from 'node-env-file'
import path from 'path'
env(path.join(__dirname, '/.env'), {overwrite: true})

const isDev = () => {
  return process.env.NODE_ENV === 'DEV'
}

const isTest = () => {
  return process.env.NODE_ENV === 'TEST'
}

const isPro = () => {
  return process.env.NODE_ENV === 'PRO'
}

const isDropDb = () => {
  return process.env.DROP === '1'
}

export { isDev, isTest, isPro, isDropDb }
export default process.env
