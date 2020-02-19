<template>
  <div class="common-wrap link-account">
    <account-header name="找回密码">
      <template>
        <span class="gotoLogin" @click="gotoLogin">返回登录<a-icon type="right"/></span>
      </template>
    </account-header>
    <div class="content">
      <a-form
        class="com-form"
      >
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
          <a-button type="primary" class="ok-btn" @click="foundPass">找回密码</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
  import AccountHeader from '@/components/AccountHeader.vue'
  import base from '../../utils/base'
  import {createLqtoken} from "../../common/js/createLqtoken";
  import {validsmscode, sendcode} from '../../axios/api'
  import {checkPhone} from "../../common/js/comReg";

  export default {
    name: 'FoundPass',
    data() {
      return {
        loginphone: '', //手机号
        logincode: '',  //验证码
        usertype: this.$route.query.usertype
      }
    },
    components: {AccountHeader},
    mounted() {
      this.initInputs()
    },
    methods: {
      initInputs() {
        let inputs = document.querySelectorAll('.ant-row .ant-input');
        base.MoveInputTips(inputs)
        $(inputs).on('focus', function () {
          base.FormErrorHide(this);
        })
      },
      // 下一步
      foundPass() {
        let loginphone = this.loginphone.trim();
        let logincode = this.logincode.trim();
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
        data.append("loginname", loginphone)
        data.append("inputcode", logincode)
        data.append("codetype", 2)//验证码类型 0：登陆， 1：注册 2：忘记密码 3:绑定
        data.append("lqtoken", this.$store.state.com.lqtoken)
        validsmscode(data).then(res => {
          if (res.data.code == 200) {
            this.$router.push({
              path: '/foundPassStep2',
              query: {
                "loginphone": loginphone,
                "logincode": logincode,
                "usertype": this.usertype
              }
            });
          } else if (res.data.code == 1001) {
            let result = createLqtoken()
            if(result == 0){
              this.foundPass()
            }
          } else {
            // base.FormError(codeErr, "验证码错误");
            this.$message.error(res.data.msg)
          }
        })
      },
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
              if(result == 0){
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
    }
  }
</script>

<style lang="less" scope>
  @import url('../../assets/css/style.less');

  .link-account {
    // .ant-form-item-children{
    //   display: initial;
    // }
  }
</style>
