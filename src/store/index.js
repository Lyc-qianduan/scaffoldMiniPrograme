import { createStore } from '@mpxjs/core'

const store = createStore({
  state: {
    token: wx.getStorageSync('token') || '',
    userInfo: wx.getStorageSync('userInfo') || null
  },
  mutations: {
    async SET_TOKEN (state, token) {
      wx.setStorageSync('token', token)
      state.token = token
    },

    async SET_USERINFO (state, userInfo) {
      wx.setStorageSync('userInfo', userInfo)
      state.userInfo = userInfo
    },

    LOGOUT (state) {
      state.token = ''
      state.userInfo = null
      wx.reLaunch({
        url: '/pages/auth/login'
      })
      wx.removeStorageSync('token')
      wx.removeStorageSync('userInfo')
    }
  },

  actions: {

  }
})

export default store
