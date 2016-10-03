const isDev = () => {
  return process.env.NODE_ENV === 'DEV'
}

const isTest = () => {
  return process.env.NODE_ENV === 'TEST'
}

const isPro = () => {
  return process.env.NODE_ENV === 'PRO'
}

export { isDev, isTest, isPro }
