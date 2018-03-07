/**
 * Created by zhuzi on 2017/12/10.
 */
const getters = {
  identity: state => state.user.identity,
  leftbar: state => state.app.leftbar,
  currentPathArray1: state => state.app.currentPathArray,
  isshow: state => state.app.isshow,
  isshowzlg: state => state.app.isshowzlg,
  isshowmaterial: state => state.app.isshowmaterial,
  isshowUser: state => state.app.isshowUser,
  storageInput: state => state.app.storageInput,
  zlgInput: state => state.app.zlgInput,
  materialInput: state => state.app.materialInput,
  userInput: state => state.app.userInput,
  routers: state => state.app.routers,
  r: state => state.app.r,
  strogeId: state => state.app.strogeId,
  userId: state => state.app.userId,
  user: state => state.app.user,
  isshowimg: state => state.app.isshowimg,
  isshowreturnimg: state => state.app.isshowreturnimg,
  userInfo: state => state.user.userInfo
}
export default getters
