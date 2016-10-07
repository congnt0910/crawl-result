import requestPromise from 'request-promise'
import { FileCookieStore as CookieStore } from './cookieStore'
import querystring from 'querystring'

export default class HttpRequest {
  constructor (props) {
    this.debug = false // boolean / Debugging
    this.request = requestPromise
    this.charles = false // enable charles bug
    this.charles_proxy = 'http://127.0.0.1:8888/' // proxy of charles
    this.default_timeout = 90000
    this.timeout = null
    this.certificate = {}
    this.ssl_method = 'SSLv3_method' // string/ example 'SSLv3_method'
    this.referer = null // string/ add referer to header;
    this.jsonPost = false // boolean/ true if post is json request
    this.header = { // default request header
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36',
      'Accept': '*/*',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate',
      'Connection': 'Close'
    }
    this.append_header = {} // object / add more header to request
    this.encoding = false
    this.followRedirect = false
    this.jar = this.request.jar() // jar object
    this.request_list = {}
    this.auto_redirect = true
  }

  /***
   * Get cookie of request
   * @returns {string}
   */
  getCookie () {
    return this.jar._jar.store.idx
  }

  /***
   * Set cookie
   * @param idx - cookie
   */
  setCookie (idx) {
    const cookie = new CookieStore(false, idx)
    this.jar = this.request.jar(cookie)
  }

  _createHeader (appendHeader) {
    const head = {}
    if (this.referer !== null) {
      head.referer = this.referer
      this.referer = null
    }
    let name, value
    for (name in this.header) {
      if (!this.header.hasOwnProperty(name)) continue
      value = this.header[name]
      head[name] = value
    }
    if (typeof appendHeader === 'object') {
      for (name in appendHeader) {
        if (!appendHeader.hasOwnProperty(name)) continue
        value = appendHeader[name]
        head[name] = value
      }
    }
    return head
  }

  _initOption (url, option) {
    const requestOption = {...option}
    // default request option
    requestOption.gzip = true
    requestOption.jar = this.jar
    requestOption.timeout = this.timeout || this.default_timeout
    requestOption.followRedirect = this.followRedirect
    requestOption.followAllRedirects = this.followRedirect
    requestOption.pool = {maxSockets: Infinity}
    requestOption.tunnel = false
    requestOption.strictSSL = false
    // custom
    requestOption.headers = this._createHeader(this.append_header)
    requestOption.uri = url
    if (this.jsonPost) {
      requestOption.json = true
      this.jsonPost = false
    }
    // reset default
    this.append_header = {}
    this.timeout = null
    this.followRedirect = false
    // other setup
    if (this.ssl_method && url.indexOf('https://') > -1) {
      requestOption.secureProtocol = this.ssl_method
    }
    if (this.encoding !== false) {
      requestOption.encoding = this.encoding
      this.encoding = false
    }
    if (this.charles) {
      requestOption.proxy = this.charles_proxy
    }
    if (this.certificate.is_certificate) {
      delete requestOption.secureProtocol
      requestOption.agentOptions = {
        ca: this.certificate.crt_file,
        secureProtocol: this.certificate.ssl_method
      }
      requestOption.strictSSL = true
    }
    return requestOption
  }

  _makeRequest (option) {
    this.request.debug = this.debug
    const requestKey = new Date().getTime() + '_' + Math.random()
    this.request_list[requestKey] = this.request(option)
    return this.request_list[requestKey]
  }

  /***
   * Make http call with method GET
   * @param url
   * @param query
   * @returns {*}
   */
  get (url, query, customOption) {
    let option = this._initOption(url, {
      method: 'GET',
      qs: query
    })
    if (customOption && typeof customOption === 'object') {
      option = {
        ...option,
        ...customOption
      }
    }
    return this._makeRequest(option)
  }

  /***
   * Make http call with method POST
   * @param url
   * @param data
   * @returns {*}
   */
  post (url, data, customOption) {
    let body = ''
    if (this.jsonPost) {
      this.append_header['Content-Type'] = 'application/json;charset=utf-8'
      body = data
    } else {
      this.append_header['Content-Type'] = 'application/x-www-form-urlencoded'
      if (typeof post === 'object') {
        // const queryString = require('querystring')
        body = querystring.stringify(data)
      }
    }
    let option = this._initOption(url, {
      method: 'POST',
      body: body
    })
    if (customOption && typeof customOption === 'object') {
      option = {
        ...option,
        ...customOption
      }
    }
    return this._makeRequest(option)
  }

  /***
   * Cancels all http request
   */
  stop () {
    for (const reqKey in this.request_list) {
      if (!this.request_list.hasOwnProperty(reqKey)) continue
      const reqObj = this.request_list[reqKey]
      reqObj.cancel()
      delete this.request_list[reqKey]
    }
  }
}
