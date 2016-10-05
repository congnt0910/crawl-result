import debug from 'debug'

export default class LogDebug extends debug {
  constructor (namespace) {
    debug.enable(process.env.DEBUG)
    super(namespace)
  }
}
