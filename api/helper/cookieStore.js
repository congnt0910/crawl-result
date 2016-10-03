// implement memstore.js ..\node_modules\tough-cookie\lib\memstore.js
'use strict'
import tough, {Store, permuteDomain, pathMatch} from 'tough-cookie'
const util = require('util')
const fs = require('fs')

function FileCookieStore (filePath, idx) {
  Store.call(this)
  this.noSaveFile = false
  this.idx = {} // idx is memory cache
  this.filePath = filePath
  const self = this
  if (idx) {
    self.noSaveFile = true
  }
  loadFromFile(this.filePath, idx, function (dataJson) {
    if (dataJson) self.idx = dataJson
  })
}
util.inherits(FileCookieStore, Store)
module.exports = FileCookieStore
FileCookieStore.prototype.idx = null

// Since it's just a struct in RAM, this Store is synchronous
FileCookieStore.prototype.synchronous = true

// force a default depth:
FileCookieStore.prototype.inspect = function () {
  return '{ idx: ' + util.inspect(this.idx, false, 2) + ' }'
}

FileCookieStore.prototype.findCookie = function (domain, path, key, cb) {
  if (!this.idx[domain]) {
    return cb(null, undefined)
  }
  if (!this.idx[domain][path]) {
    return cb(null, undefined)
  }
  return cb(null, this.idx[domain][path][key] || null)
}

FileCookieStore.prototype.findCookies = function (domain, path, cb) {
  const results = []
  if (!domain) {
    return cb(null, [])
  }

  let pathMatcher
  if (!path) {
    // null or '/' means "all paths"
    pathMatcher = function matchAll (domainIndex) {
      for (const curPath in domainIndex) {
        const pathIndex = domainIndex[curPath]
        for (const key in pathIndex) {
          results.push(pathIndex[key])
        }
      }
    }
  } else {
    pathMatcher = function matchRFC (domainIndex) {
      // NOTE: we should use path-match algorithm from S5.1.4 here
      // (see : https://github.com/ChromiumWebApps/chromium/blob/b3d3b4da8bb94c1b2e061600df106d590fda3620/net/cookies/canonical_cookie.cc#L299)
      Object.keys(domainIndex).forEach(function (cookiePath) {
        if (pathMatch(path, cookiePath)) {
          const pathIndex = domainIndex[cookiePath]
          for (const key in pathIndex) {
            results.push(pathIndex[key])
          }
        }
      })
    }
  }

  const domains = permuteDomain(domain) || [domain]
  const idx = this.idx
  domains.forEach(function (curDomain) {
    const domainIndex = idx[curDomain]
    if (!domainIndex) {
      return
    }
    pathMatcher(domainIndex)
  })

  cb(null, results)
}

FileCookieStore.prototype.putCookie = function (cookie, cb) {
  if (!this.idx[cookie.domain]) {
    this.idx[cookie.domain] = {}
  }
  if (!this.idx[cookie.domain][cookie.path]) {
    this.idx[cookie.domain][cookie.path] = {}
  }
  this.idx[cookie.domain][cookie.path][cookie.key] = cookie
  if (this.noSaveFile) {
    cb(null)
  } else {
    saveToFile(this.filePath, this.idx, function () {
      cb(null)
    })
  }
}

FileCookieStore.prototype.updateCookie = function updateCookie (oldCookie, newCookie, cb) {
  // updateCookie() may avoid updating cookies that are identical.  For example,
  // lastAccessed may not be important to some stores and an equality
  // comparison could exclude that field.
  this.putCookie(newCookie, cb)
}

FileCookieStore.prototype.removeCookie = function removeCookie (domain, path, key, cb) {
  if (this.idx[domain] && this.idx[domain][path] && this.idx[domain][path][key]) {
    delete this.idx[domain][path][key]
  }
  if (this.noSaveFile) {
    cb(null)
  } else {
    saveToFile(this.filePath, this.idx, function () {
      cb(null)
    })
  }
}

FileCookieStore.prototype.removeCookies = function removeCookies (domain, path, cb) {
  if (this.idx[domain]) {
    if (path) {
      delete this.idx[domain][path]
    } else {
      delete this.idx[domain]
    }
  }
  if (this.noSaveFile) {
    cb(null)
  } else {
    saveToFile(this.filePath, this.idx, function () {
      cb(null)
    })
  }
}

function saveToFile (filePath, data, cb) {
  const dataJson = JSON.stringify(data)
  fs.writeFile(filePath, dataJson, function (err) {
    if (err) throw err
    cb()
  })
}

function loadFromFile (filePath, idx, cb) {
  let data
  if (idx) {
    data = JSON.stringify(idx)
  }
  if (filePath) {
    data = fs.readFileSync(filePath, 'utf8')
  }
  const dataJson = data ? JSON.parse(data) : null
  for (const domainName in dataJson) {
    for (const pathName in dataJson[domainName]) {
      for (const cookieName in dataJson[domainName][pathName]) {
        dataJson[domainName][pathName][cookieName] = tough.fromJSON(JSON.stringify(dataJson[domainName][pathName][cookieName]))
      }
    }
  }
  cb(dataJson)
}
