import axios from 'axios';//引入axios
import Message from 'ant-design-vue'
let root = process.env.BASE_API;

// 创建axios实例
const instance = axios.create({
  baseURL: root,
  timeout: 1000 * 12,
  withCredentials: true,
  headers: {  //设置post请求头
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  },
});

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  router.replace({
    path: '/user/login'
  });
}

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, data) => {
  // 状态码判断
  switch (status) {
    case 401: // 401: 未登录状态，跳转登录页
      Message.error('登录过期，请重新登录')
      // store.commit("com/setUser", null)
      toLogin();
      break;
    case 402:// 403 token过期 清除token并跳转登录页
      Message.error('登录过期，请重新登录')
      // store.commit("com/setUser", null)
      setTimeout(() => {
        toLogin();
      }, 1000);
      break;
    case 404: // 404请求不存在
      // store.commit("com/setUser", null)
      router.replace({
        path: '/404',
        // query: {
        //   redirect: router.currentRoute.fullPath
        // }
      });
      break;
    default:
      console.log(status, data);
  }
}


/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
  config => {
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
    /*   const token = store.state.token;
      token && (config.headers.Authorization = token); */
    config.headers['X-Requested-With'] = "XMLHttpRequest"
    return config;
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截异常处理
instance.interceptors.response.use(response => {
  return response;
},
// 请求失败
error => {
  if (error) {
    errorHandle(response.status, response.data);
    return Promise.reject(error);
  } else {
    // 处理断网的情况
    // eg:请求超时或断网时，更新state的network状态
    // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
    // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
    /*  store.commit('changeNetwork', false); */
  }
});

export default instance;
