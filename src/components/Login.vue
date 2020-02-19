<template>
  <div class="login-wrap">
    <a-tabs defaultActiveKey="1">
      <a-tab-pane tab="密码登录" key="1">
        <a-form
          class="login-form"
        >
          <a-form-item v-if="usertype==0">
            <label class="tips">用户名</label>
            <a-input
              v-model="loginname"
              autocomplete="off"
            >
            </a-input>
            <p ref="nameErr" class="tip-error"><img src="../assets/img/err-icon.png" alt=""><span></span></p>
          </a-form-item>
          <a-form-item v-else>
            <label class="tips">手机号/邮箱</label>
            <a-input
              v-model="loginname"
              autocomplete="off"
            >
            </a-input>
            <p ref="nameErr" class="tip-error"><img src="../assets/img/err-icon.png" alt=""><span></span></p>
          </a-form-item>
          <a-form-item>
            <label class="tips">密码</label>
            <a-input
              v-model="userpass"
              :type="showPass?'text':'password'"
              autocomplete="off"
              style="padding-right:30px;"
            >
            </a-input>
            <a v-if="showPass" @click.prevent="changeEye" class="eye open"><img src="../assets/img/eye-close.png"
                                                                                alt=""></a>
            <a v-else @click.prevent="changeEye" class="eye close"><img src="../assets/img/eye-open.png" alt=""></a>
            <p ref="passErr" class="tip-error"><img src="../assets/img/err-icon.png" alt=""><span></span></p>
          </a-form-item>
          <a-form-item class="pass-form">
            <a-checkbox v-model="checked" class="remeber-pass"> 记住密码</a-checkbox>
            <a class="login-form-forgot" href="#" @click="foundPass"> 忘记密码? </a>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="loginByPass" class="login-form-button"> 登录</a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane tab="短信登录" key="2" forceRender>
        <a-form
          class="login-form"
        >
          <a-form-item>
            <label class="tips">手机号</label>
            <a-input
              v-model="loginphone"
              autocomplete="off"
            >
            </a-input>
            <p ref="phoneErr" class="tip-error"><img src="../assets/img/err-icon.png" alt=""><span></span></p>
          </a-form-item>
          <a-form-item>
            <label class="tips">验证码</label>
            <a-input
              v-model="logincode"
              type="text"
              autocomplete="off"
            >
            </a-input>
            <button ref="code" @click="LoginGetCode" class="send-code">发送验证码</button>
            <p ref="codeErr" class="tip-error"><img src="../assets/img/err-icon.png" alt=""><span></span></p>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="loginByMess" class="login-form-button"> 登录</a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
  import {sendcode} from "../axios/api";
  import base from '../utils/base'
  import {createLqtoken} from "../common/js/createLqtoken";
  import {checkPhone} from "../common/js/comReg";
  const base64 = require('js-base64').Base64
  export default {
    name: 'HelloWorld',
    data() {
      return {
        loginname: "", //登录名
        userpass: "",  //密码
        loginphone: '', //手机号
        logincode: '',  //验证码
        checked: false,
        showPass: false,
        timmer: null
      }
    },
    props: {
      usertype: {type: Number, required: true}
    },
    created() {
      if(this.usertype == 0){//个人
        this.checked = this.$store.state.com.remUserpassStatus;
        if (this.$store.state.com.remUserpassStatus) {
          this.loginname = this.$store.state.com.remUserloginname
        }
        if (this.$store.state.com.remUserpassStatus) {
          this.userpass = base64.decode(this.$store.state.com.remUserpass)
        }
      }else if(this.usertype == 1){//企业
        this.checked = this.$store.state.com.remEntpassStatus;
        if (this.$store.state.com.remEntpassStatus) {
          this.loginname = this.$store.state.com.remEntloginname
        }
        if (this.$store.state.com.remEntpassStatus) {
          this.userpass = base64.decode(this.$store.state.com.remEntpass)
        }
      }else{//院校
        this.checked = this.$store.state.com.remSchoolpassStatus;
        if (this.$store.state.com.remSchoolpassStatus) {
          this.loginname = this.$store.state.com.remSchoolloginname
        }
        if (this.$store.state.com.remSchoolpassStatus) {
          this.userpass = base64.decode(this.$store.state.com.remSchoolpass)
        }
      }
    },
    mounted() {
      let inputs = document.querySelectorAll('.ant-row .ant-input');
      base.MoveInputTips(inputs)
      $(inputs).on('focus', function () {
        base.FormErrorHide(this);
      })
    },
    methods: {
      // 是否可查看密码
      changeEye() {
        this.showPass = !this.showPass
      },
      // 获取验证码
      LoginGetCode() {
        let code = this.$refs.code;
        let phoneErr = this.$refs.phoneErr
        let loginphone = this.loginphone.trim()
        let phoneCheckResult = checkPhone(loginphone)
        if(phoneCheckResult != ""){
          base.FormError(phoneErr, phoneCheckResult);
          return
        }
        // 需要做防刷图验证

        // 发送短信验证码
        let sendData = new FormData()
        sendData.append("loginname", loginphone)
        sendData.append("codetype", 0)//验证码类型 0：登陆， 1：注册 2：忘记密码 3:绑定
        sendData.append("lqtoken", this.$store.state.com.lqtoken)
        sendcode(sendData).then(res => {
          if (res.data.code == 200) {
            //进入读秒
            base.SendCode(code, this.timmer, 60)
          } else if (res.data.code == 1001) {
            let result = createLqtoken()
            if(result == 0){
              this.LoginGetCode()
            }
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      //密码登录
      loginByPass() {
        let nameErr = this.$refs.nameErr
        let passErr = this.$refs.passErr
        let loginname = this.loginname.trim()
        let userpass = this.userpass.trim()
        if (loginname.length == 0) {
          base.FormError(nameErr, '请输入用户名');
          return;
        }
        if (userpass.length == 0) {
          base.FormError(passErr, '请输入密码');
          return;
        }
        let data = {
          "loginname": loginname,
          "userpass": userpass,
          "checked": this.checked,
          "lqtoken": this.$store.state.com.lqtoken,
        }
        this.$emit('log', data);
      },
      //短信登录
      loginByMess() {
        let phoneErr = this.$refs.phoneErr
        let codeErr = this.$refs.codeErr
        let loginphone = this.loginphone.trim()
        let logincode = this.logincode.trim()
        let phoneCheckResult = checkPhone(loginphone)
        if(phoneCheckResult != ""){
          base.FormError(phoneErr, phoneCheckResult);
          return;
        }
        if (logincode.length == 0) {
          base.FormError(codeErr, '请输入验证码');
          return;
        }
        let data = {
          "loginname": loginphone,
          "inputcode": logincode,
          "lqtoken": this.$store.state.com.lqtoken,
        }
        this.$emit('logPhone', data);
      },
      // 找回密码
      foundPass(){
        this.$router.push({
          path: '/foundPass',
          query: {
            usertype: this.usertype
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
