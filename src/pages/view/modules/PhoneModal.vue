<template>
  <a-modal
    class="editModal"
    :title=this.modalData.title
    :width="398"
    :visible="phoneVisible"
    :maskClosable="false"
    :footer="null"
    @cancel="close"
  >
    <div class="content">
      <a-form class="com-form">
        <a-form-item v-if="modalData.type=='phone'">
          <a-input
            v-model="loginphone"
            autocomplete="off"
            placeholder='手机号'
          >
          </a-input>
          <p ref="phoneErr" class="tip-error"><img src="~@/assets/img/err-icon.png" alt=""><span></span></p>
        </a-form-item>
        <a-form-item v-else>
          <a-input
            v-model="loginphone"
            autocomplete="off"
            placeholder='邮箱'
          >
          </a-input>
          <p ref="phoneErr" class="tip-error"><img src="~@/assets/img/err-icon.png" alt=""><span></span></p>
        </a-form-item>
        <a-form-item>
          <a-input
            v-model="logincode"
            type="text"
            autocomplete="off"
            placeholder="验证码"
          >
          </a-input>
          <button ref="code" @click="getCode" class="send-code">发送验证码</button>
          <p ref="codeErr" class="tip-error"><img src="~@/assets/img/err-icon.png" alt=""><span></span></p>
        </a-form-item>
        <a-form-item class="btn-item">
          <a-button type="primary" class="ok-btn" @click="onOk">完成</a-button>
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>

<script>
  import base from '../../../utils/base'
  import {checkPhone, checkEmail} from "../../../common/js/comReg";
  import {sendcode} from '../../../axios/api'
  import {createLqtoken} from "../../../common/js/createLqtoken";

  export default {
    name: 'PhoneModal',
    data() {
      return {
        loginphone: '',
        logincode: '',
      }
    },
    props: {
      phoneVisible: Boolean,
      modalData: Object,
    },
    mounted() {
      this.initInputs()
    },
    activated() {
      this.loginphone = ""
      this.logincode = ""
    },
    methods: {
      getCode() {
        let code = this.$refs.code;
        let phoneErr = this.$refs.phoneErr
        let loginphone = this.loginphone.trim()
        if (this.modalData.type == 'phone') {
          let checkPhoneResult = checkPhone(loginphone)
          if (checkPhoneResult != "") {
            base.FormError(phoneErr, checkPhoneResult);
          }
        } else {
          let checkEmailResult = checkEmail(loginphone)
          if (checkEmailResult != "") {
            base.FormError(phoneErr, checkEmailResult);
          }
        }
        // 需要做防刷图验证

        // 发送短信验证码
        let sendData = new FormData()
        sendData.append("loginname", loginphone)
        sendData.append("codetype", 3)//验证码类型 0：登陆， 1：注册 2：忘记密码 3:绑定
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
      },
      close() {
        this.loginphone = "";
        this.logincode = "";
        this.$emit('phoneVisibleClose', !this.phoneVisible)
      },
      onOk() {
        let codeErr = this.$refs.codeErr;
        let phoneErr = this.$refs.phoneErr
        // 对手机号或邮箱进行验证
        let loginphone = this.loginphone.trim();
        let logincode = this.logincode.trim();
        let checkResult = ""
        if (this.modalData.type == 'phone') {
          checkResult = checkPhone(loginphone)
        } else {
          checkResult = checkEmail(loginphone)
        }
        if (checkResult != "") {
          base.FormError(phoneErr, checkResult);
          return;
        }
        // 对验证码进行验证
        if (logincode.length == 0) {
          base.FormError(codeErr, "请输入验证码");
          return;
        }
        this.$emit('onOk', loginphone, logincode)
      },
      initInputs() {
        let inputs = document.querySelectorAll('.ant-row .ant-input');
        base.MoveInputTips(inputs)
        $(inputs).on('focus', function () {
          base.FormErrorHide(this);
        })
      },
    }
  }
</script>

<style lang="less" scope>
  @import url('~@/assets/css/style.less');
</style>
