/**
 * Created by zhuzi on 2017/12/10.
 */
import util from '../../utils/getcook.js'
const user = {
  state: {
    identity: '',
    userInfo: util.getUser()
  },
  mutations: {
    SET_IDENTITY: (state, data) => {
      state.identity = data
    },
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    },
    set_logOut (state) {
      state.userInfo = null
      util.removeUser()
    }
  },
  actions: {
    LogOut ({commit}) {
      commit('set_logOut')
    }
  }
}
export default user
