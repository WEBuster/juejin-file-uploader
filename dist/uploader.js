/**
 * Uploader v1.0.0
 * (c) 2017 yangtao <iam_yt@163.com>
 * @license MIT
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global.Uploader = factory())
}(this, function () {
  'use strict'
  /** Uploader
   * @param {String} bucket  存储空间
   * @param {String} uploadUrl 上传文件的接口地址
   * @param {String} tokenUrl 获取token的接口地址
   * @return {Object} Promise类型,返回结果一个url对象({http,https})
   */
  var Uploader = function (options) {
    var _options = {
      bucket: null,
      uploadUrl: '',
      tokenUrl: ''
    }
    Object.assign(_options, options || {})
    this._options = _options
    this._file = {}
  }

  // 上传
  Uploader.prototype.upload = function (_file) {
    if (!_file) {
      return
    }
    this._file = _file

    return this.getToken()
      .then(rst => {
        if (+rst.s !== 1) {
          return new Error('token 错误')
        } else {
          return this.uploadFile(rst.d)
        }
      })
  }

  /**
   * @return {Object} 获取token & 上传的图片的路径等信息
   */
  Uploader.prototype.getToken = function () {
    var tokenUrl = this._options.tokenUrl
    var bucket = this._options.bucket
    var urlStr = toQueryString({ bucket: bucket, filename: this._file.name })
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest()
      xhr.open('GET', tokenUrl + '?' + urlStr, true)
      xhr.responseType = 'json'
      xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
          return
        }
        if (xhr.status == 200) {
          var blkRet = xhr.response
          resolve(blkRet)
        } else {
          reject(new Error(xhr.statusText))
        }
      }
      xhr.onerror = function () {
        reject(new Error(xhr.statusText))
      }
      xhr.send(null)
    })
  }

  /**
   * @param {String} token
   * @param {String} key
   * @param {Object} url
   * @return {Object} 成功返回 url地址({http,https})
   */
  Uploader.prototype.uploadFile = function (data) {
    var self = this
    var file = this._file
    var token = data.token
    var key = data.key
    var url = data.url.https
    var uploadUrl = this._options.uploadUrl
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest()
      xhr.open('POST', uploadUrl, true)
      var formData
      formData = new FormData()
      formData.append('token', token)
      formData.append('file', file)
      formData.append('key', key)
      xhr.responseType = 'json'
      xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
          return
        }
        if (xhr.status == 200) {
          resolve(url)
        } else {
          reject(new Error(xhr.statusText))
        }
      }
      xhr.onerror = function () {
        reject(new Error(xhr.statusText))
      }
      xhr.send(formData)
    })
  }

  // util
  function toQueryPair (key, value) {
    if (typeof value == 'undefined') {
      return key
    }
    return key + '=' + encodeURIComponent(value === null ? '' : String(value))
  }
  // JSON 转 URL
  // toQueryString({bucket: 'abc',filename: 'name.jpg'}) //name=xesam&age=24
  function toQueryString (obj) {
    var ret = []
    for (var key in obj) {
      key = encodeURIComponent(key)
      var values = obj[key]
      if (values && values.constructor == Array) {
        var queryValues = []
        for (var i = 0, len = values.length, value; i < len; i++) {
          value = values[i]
          queryValues.push(toQueryPair(key, value))
        }
        ret = ret.concat(queryValues)
      } else {
        ret.push(toQueryPair(key, values))
      }
    }
    return ret.join('&')
  }

  return Uploader
}))
