<template>
  <div class="homePage">
    <div class="outer schoolWrap">
      <div class="session-sidebox">
        <img class="logo" src="~@/assets/img/lq-logo.png" alt="蓝桥">
        <div class="content">
          <img src="~@/assets/img/user-pic.png" alt="">
          <p class="t">大学生成长平台</p>
          <p class="text">大学生进入TMT行业的职业<br/>经纪人</p>
        </div>
      </div>
      <div class="session-form">
        <div class="bottom-login">
          <h1 class="title log-t">院校登录</h1>
          <login-form :usertype=2 @log="log" @logPhone="logPhone"></login-form>
          <div class="other-type">
            <p>
              <span>还没有账号? </span>
              <router-link to="/school/register" class="register-btn" href="#"> 立即注册</router-link>
            </p>
            <p>
              <router-link to="/user/login"> 个人用户登录</router-link>
              <span class="line">|</span>
              <router-link to="/enterprise/login"> 企业登录</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
    <!--<div class="bottom-login">
      <h1 class="title log-t">院校登录</h1>
      <login-form :usertype=2 @log="log" @logPhone="logPhone"></login-form>
      <div class="other-type">
        <p>
          <span>还没有账号? </span>
          <router-link to="register" class="register-btn" href="#"> 立即注册</router-link>
        </p>
        <p>
          <router-link to="/user/login"> 个人用户登录</router-link>
          <span class="line">|</span>
          <router-link to="/enterprise/login"> 企业登录</router-link>
        </p>
      </div>
    </div>-->
  </div>
</template>

<script>
  import Qs from 'qs'
  import {login, loginbycode} from '../../axios/api'
  import LoginForm from '../../components/Login.vue'
  import {createLqtoken} from "../../common/js/createLqtoken";
  import {fetch} from "../../axios/fetch";

  const base64 = require('js-base64').Base64
  export default {
    name: 'SchoolLogin',
    components: {LoginForm},
    methods: {
      // 密码登录
      log(postData) {
        postData.usertype = 2;
        let data = Qs.stringify(postData)
        login(data).then(res => {
          if (res.data.code == 200) {
            // 记住密码操作
            this.$store.commit("com/changeRemSchoolpassStatus", postData.checked)
            if (postData.checked) {
              this.$store.commit("com/changeRemSchoolloginname", postData.loginname)
              this.$store.commit("com/changeRemSchoolpass", base64.encode(postData.userpass))
            } else {
              this.$store.commit("com/changeRemSchoolloginname", "")
              this.$store.commit("com/changeRemSchoolpass", "")
            }
            this.$message.success('登录成功')
            // ajax 请求成功之后才能跳转页面
            let urls = res.data.data.urls;
            for (let index in urls) {
              fetch({url: urls[index], methods: 'get'})
            }
            // 跳转到backurl
            setTimeout(function () {
              window.location.href = this.$store.state.com.backurl
            }, 1000)
          } else if (res.data.code == 1001) {
            let result = createLqtoken()
            if (result == 0) {
              this.log(postData)
            }
          } else {
            this.$message.error(res.data.msg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 短信登录
      logPhone(postData) {
        postData.usertype = 2;
        let data = Qs.stringify(postData)
        loginbycode(data).then(res => {
          if (res.data.code == 200) {
            this.$message.success('登录成功')
            // ajax 请求成功之后才能跳转页面
            let urls = res.data.data.urls;
            for (let index in urls) {
              fetch({url: urls[index], methods: 'get'})
            }
            // 跳转到backurl
            setTimeout(function () {
              window.location.href = this.$store.state.com.backurl
            }, 1000)
          } else if (res.data.code == 1001) {
            let result = createLqtoken()
            if (result == 0) {
              this.logPhone(postData)
            }
          } else {
            this.$message.error(res.data.msg)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scope>

</style>
