/*
 * @Author: your name
 * @Date: 2020-12-02 13:47:05
 * @LastEditTime: 2020-12-02 15:33:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mpx-tpl/src/utils/requestClass.js
 */
import Fly from 'flyio/dist/npm/wx'
import {
  appKey,
  baseUrl,
  requestConfig
} from './../config'

const headerConfig = {
  'content-type': 'application/json',
  'appkey': appKey
}

class Http {
  constructor() {
    this.fly = new Fly()
    this.fly.config.headers = headerConfig
    this.fly.config.baseURL = baseUrl

    this.interceptRequest()
    this.interceptRespond()
  }

  interceptRequest() {
    this.fly.interceptors.request.use(async req => {
      // const token = store.state.token
      // if (token) {
      //   req.headers.authorization = 'bearer ' + token
      // }
      return req
    })
  }

  interceptRespond() {
    this.fly.interceptors.response.use(
      res => {
        return res.data
      },
      err => {
        return Promise.reject(err)
      }
    )
  }

  request(url, data, method = 'post', config = requestConfig) {
    return this.fly.request(
      url,
      data, {
        ...config,
        method
      }
    )
  }
}

export { Http }
