const state = {
  userInfo: null,
  loading: true,
  lqtoken: "",

  // 解析并保存传入url中的参数
  action: "login",// 默认显示登录， login :登录页面, register : 注册页面 , userinfo : 账户信息页面
  backurl: "",//登录成功后跳转到应用的地址,默认""
  usertype: 0,//账户类型, 0=个人账户 1=企业账户 2=院校账户 ，默认个人账户

  // 记住密码的相关状态(个人)
  remUserpassStatus: false,//记住密码状态，默认false
  remUserloginname: "",// 记住账号，默认空
  remUserpass: "",// 记住密码，默认空

  // 记住密码的相关状态(企业)
  remEntpassStatus: false,//记住密码状态，默认false
  remEntloginname: "",// 记住账号，默认空
  remEntpass: "",// 记住密码，默认空

  // 记住密码的相关状态(院校)
  remSchoolpassStatus: false,//记住密码状态，默认false
  remSchoolloginname: "",// 记住账号，默认空
  remSchoolpass: "",// 记住密码，默认空
}


const getters = {
  getuserInfo(state) {
    return state.userInfo;
  },
  getLoading(state) {
    return state.loading;
  },
  getAction(state) {
    return state.action;
  },
  getBackurl(state) {
    return state.backurl;
  },
  getUsertype(state) {
    return state.usertype;
  },
  getLqtoken(state) {
    return state.lqtoken;
  },

  //个人记住密码
  getRemUserpassStatus(state) {
    return state.remUserpassStatus;
  },
  getRemUserloginname(state) {
    return state.remUserloginname;
  },
  getRemUserpass(state) {
    return state.remUserpass;
  },

  // 企业记住密码
  getRemEntpassStatus(state) {
    return state.remEntpassStatus;
  },
  getRemEntloginname(state) {
    return state.remEntloginname;
  },
  getRemEntpass(state) {
    return state.remEntpass;
  },

  //院校记住密码
  getRemSchoolpassStatus(state) {
    return state.remSchoolpassStatus;
  },
  getRemSchoolloginname(state) {
    return state.remSchoolloginname;
  },
  getRemSchoolpass(state) {
    return state.remSchoolpass;
  },
}

const actions = {
  LoginByUsername({commit}, data) {
    commit('setUserInfo', data)
  },
  setLoading({commit}, data) {
    commit('changeLoading', data)
  },
  setAction({commit}, data) {
    commit('changeAction', data)
  },
  setBackurl({commit}, data) {
    commit('changeBackurl', data)
  },
  setUsertype({commit}, data) {
    commit('changeUsertype', data)
  },
  setLqtoken({commit}, data) {
    commit('changeLqtoken', data)
  },

  //个人记住密码
  setRemUserpassStatus({commit}, data) {
    commit('changeRemUserpassStatus', data)
  },
  setRemUserloginname({commit}, data) {
    commit('changeRemUserloginname', data)
  },
  setRemUserpass({commit}, data) {
    commit('changeRemUserpass', data)
  },

  //企业记住密码
  setRemEntpassStatus({commit}, data) {
    commit('changeRemEntpassStatus', data)
  },
  setRemEntloginname({commit}, data) {
    commit('changeRemEntloginname', data)
  },
  setRemEntpass({commit}, data) {
    commit('changeRemEntpass', data)
  },

  //院校记住密码
  setRemSchoolpassStatus({commit}, data) {
    commit('changeRemSchoolpassStatus', data)
  },
  setRemSchoolloginname({commit}, data) {
    commit('changeRemSchoolloginname', data)
  },
  setRemSchoolpass({commit}, data) {
    commit('changeRemSchoolpass', data)
  },
}

const mutations = {
  setUserInfo(state, payload) {
    state.userInfo = payload
  },
  changeLoading(state, val) {
    state.loading = val
  },

  changeAction(state, val) {
    state.action = val
  },
  changeBackurl(state, val) {
    state.backurl = val
  },
  changeUsertype(state, val) {
    state.usertype = val
  },
  changeLqtoken(state, val) {
    state.lqtoken = val
  },

  //个人记住密码
  changeRemUserpassStatus(state, val) {
    state.remUserpassStatus = val
  },
  changeRemUserloginname(state, val) {
    state.remUserloginname = val
  },
  changeRemUserpass(state, val) {
    state.remUserpass = val
  },

  //企业记住密码
  changeRemEntpassStatus(state, val) {
    state.remEntpassStatus = val
  },
  changeRemEntloginname(state, val) {
    state.remEntloginname = val
  },
  changeRemEntpass(state, val) {
    state.remEntpass = val
  },

  //院校记住密码
  changeRemSchoolpassStatus(state, val) {
    state.remSchoolpassStatus = val
  },
  changeRemSchoolloginname(state, val) {
    state.remSchoolloginname = val
  },
  changeRemSchoolpass(state, val) {
    state.remSchoolpass = val
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
