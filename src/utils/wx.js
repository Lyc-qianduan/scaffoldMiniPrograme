// 获取当前页面的对象
function getPage (index = 1) {
  const pages = getCurrentPages() // eslint-disable-line
  if (pages.length < index) return null
  return pages[pages.length - index] // 获取当前页面的对象
}

function getPageUrl (page) {
  const url = page.route // 当前页面url
  const options = page.options // 如果要获取url中所带的参数可以查看options

  // 拼接url的参数
  let urlWithArgs = `${url}?`
  for (const key in options) {
    const value = options[key]
    urlWithArgs += `${key}=${value}&`
  }
  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)

  return '/' + urlWithArgs
}

/* 获取当前页url（不带参数） */
export const getCurrentPageUrl = () => {
  const page = getPage()
  if (!page) return ''
  return '/' + page.route
}

/* 获取上一页url */
export const getPrevPageUrl = () => {
  const page = getPage(2)
  if (!page) return ''
  return '/' + page.route
}

/* 获取当前页带参数的url */
export const getCurrentPageUrlWithArgs = () => {
  const currentPage = getPage()
  if (!currentPage) return ''
  return getPageUrl(currentPage)
}

/* 获取上一页带参数的url */
export const getPrevPageUrlWithArgs = () => {
  const currentPage = getPage(2)
  if (!currentPage) return ''
  return getPageUrl(currentPage)
}

// {a: 1, b: underfined, c: 'ppp'} => '?a=1&b&c=ppp'
export const objToUrl = obj => {
  return Object.keys(obj).map((key, index) => {
    let value = ''
    if (!obj[key]) value = ''
    else if (typeof obj[key] === 'object') value = JSON.stringify(obj[key])
    else value = obj[key]
    if (index === 0) return '?' + key + '=' + value
    return '&' + key + '=' + value
  }).join('')
}

// 可传入字符串，也可按 wx.showToast文档那样传入对象
// 如果传入的汉字大于14个，则调用 wx.showModal
export const showToast = (param = {}) => {
  let title = '网络错误'
  let icon = 'none'
  if (typeof param === 'object') {
    title = param.title || title
    icon = param.icon || 'success'
  } else if (typeof param === 'string') {
    if (param.length > 14) return showModal(param)
    title = param
  }
  wx.showToast({
    title,
    icon
  })
}

// 可传入字符串，也可按 wx.showModal文档那样传入对象
// 如果传对象，则返回 promise，传字符串只弹框
export const showModal = params => {
  if (typeof params === 'object') {
    return new Promise((resolve, reject) => {
      wx.showModal({
        cancelColor: '#9b9b9b',
        confirmColor: '#0253D9',
        ...params
      }).then(res => {
        if (res.confirm) {
          resolve()
        } else {
          reject(res)
        }
      }).catch(error => {
        reject(error)
      })
    })
  } else if (typeof params === 'string') {
    return wx.showModal({
      showCancel: false,
      content: params
    })
  }
}

// 更新小程序版本
export const checkUpdateManager = _ => {
  const updateManager = wx.getUpdateManager()

  updateManager.onCheckForUpdate(function (res) {
    // 请求完新版本信息的回调
    console.log('有新版本：' + res.hasUpdate)
  })

  updateManager.onUpdateReady(function () {
    wx.showModal({
      title: '更新提示',
      content: '新版本已经准备好，是否重启应用？',
      success (res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate()
        }
      }
    })
  })
}

// 判断调用需要用户授权的微信 api 时，用户是否点击了同意授权
// scopeName: writePhotosAlbum、userLocation 等需要授权的 api
export const wxMethodAuthorize = scopeName => new Promise(async (resolve, reject) => {
  const resSetting = await wx.getSetting()
  if (resSetting.authSetting[`scope.${scopeName}`]) {
    resolve()
  } else {
    wx.authorize({
      scope: `scope.${scopeName}`
    }).then(_ => {
      resolve()
    }).catch(_ => {
      reject('用户拒绝了授权')
    })
  }
})

/**
 * 获取用户位置信息
 * return promise
 *  - resove: return {latitude, longitude}
 *  - reject: return 错误信息，string 类型
 */
export const getLocation = () => new Promise((resolve, reject) => {
  wxMethodAuthorize('userLocation').then(async _ => {
    const {
      latitude,
      longitude
    } = await wx.getLocation().catch(e => reject(e))
    resolve({
      latitude,
      longitude
    })
  }).catch(error => {
    // 拒绝授权
    reject(error)
  })
})
