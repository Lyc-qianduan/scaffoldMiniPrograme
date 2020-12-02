/*
 * @Author: your name
 * @Date: 2020-12-02 14:34:39
 * @LastEditTime: 2020-12-02 15:00:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mpx-tpl/src/models/user.js
 */

import { Http } from './../utils/requestClass.js'

class BookModel extends Http {
  getUser(data = {}) {
    const method = 'get'
    return this.request(
      '/book/hot_list',
      data,
      method
    )
  }
}

export {
  BookModel
}
