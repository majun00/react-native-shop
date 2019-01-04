/*
 * @Description: 请求封装
 * @Author: majun
 * @Date: 2019-01-02 15:04:27
 * @LastEditors: majun
 * @LastEditTime: 2019-01-04 09:47:59
 */

let HTTPBase = {}

/**
 * GET请求
 * @param url
 * @param params {}
 * @param headers
 *
 * @return {Promise}
 */
HTTPBase.get = (url, params, headers) => {
  if (params) {
    let paramsArray = []
    let paramsKeyArray = Object.keys(params)
    paramsKeyArray.forEach(key => {
      paramsArray.push(key + '=' + params[key])
    })

    if (url.search(/\?/) === -1) {
      url += '?' + paramsArray.join('&')
    } else {
      url += paramsArray.join('&')
    }
  }

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'GET',
      headers: headers
    })
      .then(response => response.json())
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        reject({ status: -1 })
      })
      .done()
  })
}

/**
 * POST请求
 * @param url
 * @param params {}
 * @param headers
 *
 * @return {Promise}
 */
HTTPBase.post = (url, params, headers) => {
  let formData = new FormData()
  if (params) {
    let paramsKeyArray = Object.keys(params)
    paramsKeyArray.forEach(key => {
      formData.append(key, params[key])
    })
  }

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      headers: headers,
      body: formData
    })
      .then(response => response.json())
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        reject({ status: -1 })
      })
      .done()
  })
}

// global.HTTPBase = HTTPBase
export default HTTPBase