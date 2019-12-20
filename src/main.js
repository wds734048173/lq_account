import Vue from 'vue'
// import { Button,Form } from 'ant-design-vue';
import App from './App'
import router from './router/index'

// 全局引入 antd
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'; // or 'ant-design-vue/dist/antd.less'
Vue.use(Antd);

// import { message } from 'ant-design-vue'
// Vue.prototype.$message = message;
// message.config({
//     duration: 2,
// });

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
