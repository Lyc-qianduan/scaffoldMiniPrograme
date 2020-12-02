/*
 * @Author: your name
 * @Date: 2020-12-02 14:34:39
 * @LastEditTime: 2020-12-02 15:45:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mpx-tpl/src/models/user.js
 */

import { Http } from '../utils/requestClass.js'

const isGetMethod = 'get'

class BookModel extends Http {
  getHotList(data = {}) {
    return this.request(
      '/book/hot_list',
      data,
      isGetMethod
    )
  }

  search(start, q) {
    return this.request(
      'book/search?summary=1',
      {
        q,
        start
      }
    )
  }

  getMyBookCount() {
    return this.request(
      '/book/favor/count'
    )
  }

  getDetail(bid) {
    return this.request(
      `book/${bid}/detail`
    )
  }

  getLikeStatus(bid) {
    return this.request(
      `/book/${bid}/favor`
    )
  }

  getComments(bid) {
    return this.request(
      `book/${bid}/short_comment`
    )
  }

  postComment(bid, comment) {
    return this.request(
      'book/add/short_comment',
      {
        book_id: bid,
        content: comment
      }
    )
  }
}

export {
  BookModel
}
