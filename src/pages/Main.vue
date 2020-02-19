<template>
  <!--<div class="homePage">
    <router-view/>
  </div>-->
</template>

<script>
  import {createLqtoken} from '../common/js/createLqtoken'

  export default {
    name: 'Main',
    data() {
      return {}
    },
    created() {
      this.initParam()
      let result = createLqtoken()
      if (result == 0) {
        this.todoPage()
      }
    },
    activated() {
      this.initParam()
      let result = createLqtoken()
      if (result == 0) {
        this.todoPage()
      }
    },
    methods: {
      // 获取url参数
      initParam() {
        alert("参数处理")
        let url = location.search; //获取url中"?"符后的字串
        if (url.indexOf("?") != -1) {
          let obj = this.$qs.parse(url.substr(1))
          for (let key in obj) {
            if (key == "action") {
              this.$store.commit("com/changeAction", obj[key])
            } else if (key == "backurl") {
              this.$store.commit("com/changeBackurl", obj[key])
            } else if (key == "usertype") {
              this.$store.commit("com/changeUsertype", obj[key])
            }
          }
        }
      },
      // 页面跳转
      todoPage() {
        alert("页面跳转")
        if (this.$store.state.com.usertype == 0) {//个人
          if (this.$store.state.com.action == "login") {// 登录
            this.$router.push({
              path: '/user/login',
            })
          } else if (this.$store.state.com.action == "register") {// 注册
            this.$router.push({
              path: '/user/register',
            })
          } else if (this.$store.state.com.action == "userinfo") {// 个人中心
            this.$router.push({
              path: '/selfManage',
            })
          }
        } else if (this.$store.state.com.usertype == 1) {//企业
          if (this.$store.state.com.action == "login") {// 登录
            this.$router.push({
              path: '/enterprise/login',
            })
          } else if (this.$store.state.com.action == "register") {// 注册
            this.$router.push({
              path: '/enterprise/register',
            })
          } else if (this.$store.state.com.action == "userinfo") {// 个人中心
            this.$router.push({
              path: '/selfManage',
            })
          }
        } else if (this.$store.state.com.usertype == 2) {//院校
          if (this.$store.state.com.action == "login") {// 登录
            this.$router.push({
              path: '/school/login',
            })
          } else if (this.$store.state.com.action == "register") {// 注册
            this.$router.push({
              path: '/school/register',
            })
          }
          // 院校没有个人中心
          /*else if (this.$store.state.com.action == "userinfo") {// 个人中心
            this.$router.push({
              path: '/selfManage',
            })
          }*/
        }
      },
    }
  }
</script>

<style lang="less" scoped>
</style>
