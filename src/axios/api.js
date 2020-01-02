import { fetch } from "./fetch"; //引用fetch.js
// import fetch from "./http"; //引用fetch.js
import api from './url'; //引用url.js

//注册
export function register(data){
  return fetch({
    url: api.register,
    method: 'post',
    data: data
  })
}
// export function register(data){
//   return fetch.post(api.register, data)
// }

//登录
export function login(data){
  return fetch({
    url: api.login,
    method: 'post',
    data: data
  })
}

//个人中心
export function getUcenterInfo(){
  return fetch({
    url: api.ucenter,
    method: 'get',
    params: {}
  })
}

