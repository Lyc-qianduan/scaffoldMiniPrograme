/*
 * @Author: your name
 * @Date: 2020-12-01 21:11:07
 * @LastEditTime: 2020-12-02 11:42:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mpx-tpl/src/api/user.js
 */
import request from './../utils/request'
export function getUser(data = {}) {
  return request(
    '/book/hot_list',
    data
  )
}
