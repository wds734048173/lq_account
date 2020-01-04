import Vue from 'vue'
import Vuex from 'vuex'
// import { Button,Form } from 'ant-design-vue';
import App from './App'
import router from './router/index'
import axios from 'axios'
import './assets/css/base.css'

Vue.use(Vuex);

// 全局引入 antd
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'; // or 'ant-design-vue/dist/antd.less'
Vue.use(Antd);

console.log(process.env)

//将axios挂载到Vue实例中的$ajax上面,在项目中的任何位置通过this.$http使用
Vue.prototype.$http = axios 

import { message } from 'ant-design-vue'
Vue.prototype.$message = message;
message.config({
    duration: 2,
});

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
