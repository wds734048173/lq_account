<template>
  <div class="homePage">
    <div class="outer userWrap">
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
          <h1 class="title log-t">个人用户登录</h1>
          <login-form :usertype=0 @log="log" @logPhone="logPhone"></login-form>
          <div class="wx">
            <img src="../../assets/img/wx.png" alt="">
            &lt;!&ndash;<router-link class="wx-lgoin" @click="wxlogin"> 微信登录</router-link>&ndash;&gt;
            <a class="wx-lgoin" @click="wxlogin"> 微信登录</a>
          </div>
          <div class="other-type">
            <p>
              <span>还没有账号? </span>
              <router-link to="/user/register" class="register-btn" href="#"> 立即注册</router-link>
            </p>
            <p>
              <router-link to="/school/login"> 院校登录</router-link>
              <span class="line">|</span>
              <router-link to="/enterprise/login"> 企业登录</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
    <!--<div class="bottom-login">
      <h1 class="title log-t">个人用户登录</h1>
      <login-form :usertype=0 @log="log" @logPhone="logPhone"></login-form>
      <div class="wx">
        <img src="../../assets/img/wx.png" alt="">
        &lt;!&ndash;<router-link class="wx-lgoin" @click="wxlogin"> 微信登录</router-link>&ndash;&gt;
        <a class="wx-lgoin" @click="wxlogin"> 微信登录</a>
      </div>
      <div class="other-type">
        <p>
          <span>还没有账号? </span>
          <router-link to="register" class="register-btn" href="#"> 立即注册</router-link>
        </p>
        <p>
          <router-link to="/school/login"> 院校登录</router-link>
          <span class="line">|</span>
          <router-link to="/enterprise/login"> 企业登录</router-link>
        </p>
      </div>
    </div>-->
  </div>
</template>

<script>
  import Qs from 'qs'
  import {login, getloginurl, loginbycode} from '../../axios/api'
  import LoginForm from '../../components/Login.vue'
  import {createLqtoken} from "../../common/js/createLqtoken";
  import {fetch} from "../../axios/fetch";

  const base64 = require('js-base64').Base64
  export default {
    name: 'UserLogin',
    data() {
      return {}
    },
    created() {

    },
    components: {LoginForm},
    methods: {
      wxlogin() {
        let data = new FormData()
        data.append("usertype", 0)
        data.append("lqtoken", this.$store.state.com.lqtoken)
        getloginurl(data).then(res => {
          if (res.data.code == 200) {
            window.location.href = res.data.wxurl
          } else if (res.data.code == 1001) {
            let result = createLqtoken()
            if (result == 0) {
              this.wxlogin()
            }
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      // 密码登录
      log(postData) {
        postData.usertype = 0;
        let data = Qs.stringify(postData)
        login(data).then(res => {
          if (res.data.code == 200) {
            // 记住密码操作
            this.$store.commit("com/changeRemUserpassStatus", postData.checked)
            if (postData.checked) {
              this.$store.commit("com/changeRemUserloginname", postData.loginname)
              this.$store.commit("com/changeRemUserpass", base64.encode(postData.userpass))
            } else {
              this.$store.commit("com/changeRemUserloginname", "")
              this.$store.commit("com/changeRemUserpass", "")
            }
            this.$message.success('登录成功')
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
        postData.usertype = 0;
        let data = Qs.stringify(postData)
        loginbycode(data).then(res => {
          if (res.data.code == 200) {
            this.$message.success('登录成功')
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

<style lang="less" scope>
  .wx {
    text-align: center;

    img {
      height: 32px;
      width: 32px;
    }

    .wx-lgoin {
      font-size: 14px;
      font-weight: 500;
      color: rgba(102, 102, 102, 1);
      line-height: 20px;
    }
  }
</style>
