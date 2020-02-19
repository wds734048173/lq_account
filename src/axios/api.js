import {fetch} from "./fetch"; //引用fetch.js
// import fetch from "./http"; //引用fetch.js
import api from './url'; //引用url.js
import store from '../vuex/store'

//创建token
export async function createtoken(data) {
  return await fetch({
    xhrFields: {withCredentials: true},
    crossDomain: true,
    /*headers: {
      'lqtoken': store.state.com.lqtoken
    },*/
    url: api.createtoken,
    method: 'post',
    data: data
  })
}

//注册
export function register(data) {
  return fetch({
    xhrFields: {withCredentials: true},
    crossDomain: true,
    url: api.register,
    method: 'post',
    data: data
  })
}

//密码登录
export function login(data) {
  return fetch({
    xhrFields: {withCredentials: true},
    crossDomain: true,
    url: api.login,
    method: 'post',
    data: data
  })
}



// 发送验证码
export function sendcode(data) {
  return fetch({
    xhrFields: {withCredentials: true},
    crossDomain: true,
    url: api.sendcode,
    method: 'post',
    data: data
  })
}
// 获取微信登陆url
export function getloginurl(data) {
  return fetch({
    xhrFields: {withCredentials: true},
    crossDomain: true,
    url: api.getloginurl,
    method: 'post',
    data: data
  })
}
// 微信登陆
export function wxlogin(data) {
  return fetch({
    xhrFields: {withCredentials: true},
    crossDomain: true,
    url: api.wxlogin,
    method: 'post',
    data: data
  })
}

// 微信登录并绑定手机号
export function wxloginnext(data) {
  return fetch({
    xhrFields: {withCredentials: true},
    crossDomain: true,
    url: api.wxloginnext,
    method: 'post',
    data: data
  })
}

// 短信登陆
export function loginbycode(data) {
  return fetch({
    xhrFields: {withCredentials: true},
    crossDomain: true,
    url: api.loginbycode,
    method: 'post',
    data: data
  })
}


//个人中心
export function getUcenterInfo(data) {
  return fetch({
    xhrFields: {withCredentials: true},
    crossDomain: true,
    url: api.userinfo,
    method: 'post',
    data: data
  })
}

//修改密码
export function updatepwd(data) {
  return fetch({
    xhrFields: {withCredentials: true},
    crossDomain: true,
    url: api.updatepwd,
    method: 'post',
    data: data
  })
}

//修改联系人
export function updatelinkman(data) {
  return fetch({
    xhrFields: {withCredentials: true},
    crossDomain: true,
    url: api.updatelinkman,
    method: 'post',
    data: data
  })
}

//修改、绑定手机号
export function bindphone(data) {
  return fetch({
    xhrFields: {withCredentials: true},
    crossDomain: true,
    url: api.bindphone,
    method: 'post',
    data: data
  })
}

//修改、绑定邮箱
export function bindemail(data) {
  return fetch({
    xhrFields: {withCredentials: true},
    crossDomain: true,
    url: api.bindemail,
    method: 'post',
    data: data
  })
}

//忘记密码1
export function validsmscode(data) {
  return fetch({
    xhrFields: {withCredentials: true},
    crossDomain: true,
    url: api.validsmscode,
    method: 'post',
    data: data
  })
}

//忘记密码2
export function resetpwd(data) {
  return fetch({
    xhrFields: {withCredentials: true},
    crossDomain: true,
    url: api.resetpwd,
    method: 'post',
    data: data
  })
}

//解绑邮箱
export function unbindemail(data) {
  return fetch({
    xhrFields: {withCredentials: true},
    crossDomain: true,
    url: api.unbindemail,
    method: 'post',
    data: data
  })
}

//解绑微信
export function unbindweixin(data) {
  return fetch({
    xhrFields: {withCredentials: true},
    crossDomain: true,
    url: api.unbindweixin,
    method: 'post',
    data: data
  })
}
//绑定微信获取微信url
export function getwxurl(data) {
  return fetch({
    xhrFields: {withCredentials: true},
    crossDomain: true,
    url: api.getwxurl,
    method: 'post',
    data: data
  })
}

//绑定微信获取微信url
export function bindwx(data) {
  return fetch({
    xhrFields: {withCredentials: true},
    crossDomain: true,
    url: api.bindwx,
    method: 'post',
    data: data
  })
}

