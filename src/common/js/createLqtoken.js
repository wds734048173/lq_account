import {createtoken} from '../../axios/api'
import {message} from 'ant-design-vue'
import store from '../../vuex/store'
// 对于请求时，lqtoken过期后，重新调用创建lqtoken方法
export function createLqtoken() {
  let data = new FormData()
  data.append("loginby", "web");
  data.append("deviceid", "");
  let result = 0
  createtoken(data).then(res => {
    console.log(res.data)
    if (res.data.code == 200) {
      store.commit("com/changeLqtoken", res.data.lqtoken)
    } else {
      result = 1
      message.error(res.data.msg)
    }
  })
  return result;
}
