if (!String.prototype.padStart) {
  /* eslint-disable*/
  String.prototype.padStart = function padStart(targetLength, padString) {
    targetLength = targetLength >> 0 // truncate if number or convert non-number to 0;
    padString = String((typeof padString !== 'undefined' ? padString : ' '))
    if (this.length > targetLength) {
      return String(this)
    } else {
      targetLength = targetLength - this.length
      if (targetLength > padString.length) {
        padString += padString.repeat(targetLength / padString.length) // append to original to ensure we are longer than needed
      }
      return padString.slice(0, targetLength) + String(this)
    }
  }
}
// 把时间转换成 yyyy-mm-dd
export const formatDate = (date = new Date()) => {
  try {
    date = new Date(date)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    return year + '-' + month.toString().padStart(2, 0) + '-' + day.toString().padStart(2, 0)
  } catch (error) {
    console.log('formatDate', error)
    return ''
  }
}

/*
 * 频率控制 返回函数连续调用时，fn 执行频率限定为每多少时间执行一次
 * @param fn {function}  需要调用的函数
 * @param delay  {number}    延迟时间，单位毫秒
 * @param immediate  {bool} 给 immediate参数传递 true 时，绑定的函数 delay 后执行。
 * @return {function}实际调用函数
 */
export const Throttle = function (fn, delay, immediate = false, debounce) {
  let curr = +new Date() // 当前时间
  let last_call = 0
  let last_exec = 0
  let timer = null
  let diff // 时间差
  let context // 上下文
  let args
  let exec = function () {
    last_exec = curr
    fn.apply(context, args)
  }

  return function () {
    curr = +new Date()
    context = this
    args = arguments
    diff = curr - (debounce ? last_call : last_exec) - delay
    clearTimeout(timer)
    if (debounce) {
      if (immediate) {
        timer = setTimeout(exec, delay)
      } else if (diff >= 0) {
        exec()
      }
    } else {
      if (diff >= 0) {
        exec()
      } else if (immediate) {
        timer = setTimeout(exec, -diff)
      }
    }
    last_call = curr
  }
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}
