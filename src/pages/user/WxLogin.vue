<template>
  <div class="common-wrap link-account">
    <!--登录微信返回页：http://dev.lanqiao.cn/wxlogin-->
    <!--<account-header name="绑定手机号">
      <template>
        <span class="gotoLogin" @click="gotoLogin">返回登录<a-icon type="right"/></span>
      </template>
    </account-header>-->
    <account-header name="请关联你的蓝桥账号">
      <template>
        <span class="gotoLogin" @click="gotoLogin">返回登录<a-icon type="right"/></span>
      </template>
    </account-header>
    <div class="content">
      <a-form
        class="com-form"
      >
        <div style="margin-bottom:40px;">
          <span style="font-size: 1px; float:left;color: #999999">您的微信还没有绑定手机号，请先绑定手机号</span>
        </div>
        <a-form-item>
          <label class="tips">手机号</label>
          <a-input
            v-model="loginphone"
            autocomplete="off"
          >
          </a-input>
          <p ref="phoneErr" class="tip-error"><img src="~@/assets/img/err-icon.png" alt=""><span></span></p>
        </a-form-item>
        <a-form-item>
          <label class="tips">验证码</label>
          <a-input
            v-model="logincode"
            type="text"
            autocomplete="off"
          >
          </a-input>
          <button ref="code" @click="getCode" class="send-code">发送验证码</button>
          <p ref="codeErr" class="tip-error"><img src="~@/assets/img/err-icon.png" alt=""><span></span></p>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" class="ok-btn" @click="bindPhone">注册并绑定</a-button>
        </a-form-item>
        <p class="lq-agreement">注册代表你已同意 <a href="">《蓝桥用户协议》</a></p>
      </a-form>
    </div>
  </div>
</template>

<script>
  import AccountHeader from '@/components/AccountHeader.vue'
  import {wxlogin, wxloginnext, sendcode,} from '../../axios/api'
  import base from '../../utils/base'
  import {checkPhone} from "../../common/js/comReg";
  import {createLqtoken} from "../../common/js/createLqtoken";

  export default {
    name: 'WxLogin',
    data() {
      return {
        code: 1,
        state: 0,
        // 是否显示绑定手机号
        show: false,
        loginphone: '', //手机号
        logincode: '',  //验证码
        usertype: 0,//微信登录来自于个人
      }
    },
    components: {AccountHeader},
    mounted() {
      this.initInputs()
    },
    activated() {
      this.getWxbackparams();
      setTimeout(() => {
        this.checkWxLogin()
      }, 1000);
    },
    methods: {
      initInputs() {
        let inputs = document.querySelectorAll('.ant-row .ant-input');
        base.MoveInputTips(inputs)
        $(inputs).on('focus', function () {
          base.FormErrorHide(this);
        })
      },
      // 获取微信返回的值
      getWxbackparams() {
        let url = location.search; //获取url中"?"符后的字串
        if (url.indexOf("?") != -1) {
          let obj = this.$qs.parse(url.substr(1))
          for (let key in obj) {
            if (key == "code") {
              this.code = obj[key]
            } else if (key == "state") {
              this.state = obj[key]
            }
          }
        }
      },
      // 检测账号登录
      checkWxLogin() {
        let data = new FormData()
        data.append("code", this.code)
        data.append("state", this.state + "," + this.$store.state.com.lqtoken)
        wxlogin(data).then(res => {
          if (res.data.code == 200) {
            if(res.data.data.next){//true表示需要去绑定手机号
              this.show = true
            }else{//不需要绑定手机号，直接登录
              this.show = false
              console.log("微信登录成功")
              let urls = res.data.data.urls;
              for (let index in urls) {
                fetch({url: urls[index], methods: 'get'})
              }
              // 跳转到backurl
              setTimeout(() => {
                window.location.href = this.$store.state.com.backurl
              }, 1000)
            }
          } else if (res.data.code == 1001) {
            let result = createLqtoken()
            if (result == 0) {
              this.checkWxLogin()
            }
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      // 发送验证码
      getCode() {
        let code = this.$refs.code;
        let phoneErr = this.$refs.phoneErr;
        let loginphone = this.loginphone.trim()
        // 检验手机号
        let checkPhoneResult = checkPhone(loginphone);
        if (checkPhoneResult == "") {
          // 需要做防刷图验证

          // 发送短信验证码
          let sendData = new FormData()
          sendData.append("loginname", loginphone)
          sendData.append("codetype", 2)//验证码类型 0：登陆， 1：注册 2：忘记密码 3:绑定
          sendData.append("lqtoken", this.$store.state.com.lqtoken)
          sendcode(sendData).then(res => {
            if (res.data.code == 200) {
              //进入读秒
              base.SendCode(code, this.timmer, 60)
            } else if (res.data.code == 1001) {
              let result = createLqtoken()
              if (result == 0) {
                this.getCode()
              }
            } else {
              this.$message.error(res.data.msg)
            }
          })
        } else {
          base.FormError(phoneErr, checkPhoneResult);
        }
      },
      // 微信登录，绑定手机号
      bindPhone() {
        let loginphone = this.loginphone.trim()
        let logincode = this.logincode.trim()
        let phoneErr = this.$refs.phoneErr;
        let codeErr = this.$refs.codeErr;
        // 检验
        let checkPhoneResult = checkPhone(loginphone);
        if (checkPhoneResult != "") {
          base.FormError(phoneErr, checkPhoneResult);
          return;
        }
        if (logincode.length == 0) {
          base.FormError(codeErr, "请输入验证码");
          return;
        }
        let data = new FormData()
        data.append("loginname", this.loginphone)
        data.append("inputcode", this.logincode)
        data.append("lqtoken", this.$store.state.com.lqtoken)
        wxloginnext(data).then(res => {
          if (res.data.code == 200) {
            this.$message.success("手机号绑定成功")

            let urls = res.data.data.urls;
            for (let index in urls) {
              fetch({url: urls[index], methods: 'get'})
            }
            // 跳转到backurl
            setTimeout(() => {
              window.location.href = this.$store.state.com.backurl
            }, 1000)
          } else if (res.data.code == 1001) {
            let result = createLqtoken()
            if (result == 0) {
              this.bindPhone()
            }
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      gotoLogin() {
        //0=个人账户 1=企业账户 2=院校账户 ，默认个人账户
        if (this.usertype == 0) {
          this.$router.push({
            path: '/user/login',
          })
        } else if (this.usertype == 1) {
          this.$router.push({
            path: '/enterprise/login',
          })
        } else {
          this.$router.push({
            path: '/school/login',
          })
        }
      }
    },
  }
</script>
<style lang="less" scope>
  @import url('~@/assets/css/style.less');
</style>
