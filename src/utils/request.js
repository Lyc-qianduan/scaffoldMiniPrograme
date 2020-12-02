import Fly from 'flyio/dist/npm/wx'
import {
  appKey,
  baseUrl,
  requestConfig
} from './../config'

console.log(appKey, baseUrl)

const headerConfig = {
  'content-type': 'application/json',
  'appkey': appKey
}

const fly = new Fly()
fly.config.headers = headerConfig
fly.config.baseURL = baseUrl

// 添加拦截器
fly.interceptors.request.use(async req => {
  // const token = store.state.token
  // if (token) {
  //   req.headers.authorization = 'bearer ' + token
  // }
  return req
})

fly.interceptors.response.use(
  res => {
    return res.data
  },
  err => {
    return Promise.reject(err)
  }
)

const request = function (url, data, method = 'post', config = requestConfig) {
  return fly.request(
    url,
    data,
    {
      ...config,
      method
    }
  )
}
export default request
