import Fly from 'flyio/dist/npm/wx'

const fly = new Fly()

fly.config.baseURL = 'https://'

// 添加拦截器
fly.interceptors.request.use(async req => {
  // const token = store.state.token
  // if (token) {
  //   req.headers.authorization = 'bearer ' + token
  // }
  // return req
})

fly.interceptors.response.use(
  res => {
    return res.data
  },
  err => {
    return Promise.reject(err)
  }
)

export default fly
