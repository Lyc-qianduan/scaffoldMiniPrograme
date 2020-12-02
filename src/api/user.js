/*
 * @Author: your name
 * @Date: 2020-12-01 21:11:07
 * @LastEditTime: 2020-12-02 13:37:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mpx-tpl/src/api/user.js
 */
import request from './../utils/request'
export function getUser(data = {}) {
  const method = 'get'
  return request(
    '/book/hot_list',
    data,
    method
  )
}
