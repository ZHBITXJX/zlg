/**
 * Created by zhuzi on 2018/1/18.
 */
import Cookies from 'js-cookie'

let util = {}

util.getUser = function () {
  let userInfo = Cookies.get('userInfo')
  if (userInfo !== '' && userInfo !== undefined) {
    return JSON.parse(userInfo)
  } else {
    return null
  }
}

util.removeUser = function () {
  Cookies.remove('userInfo')
}

export default util
