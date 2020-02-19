<template>
  <div class="account-manage">
    <h1 class="detail-title">账户管理</h1>
    <ul class="safe-info">
      <li class="item phone ">
        <div class="unbind" v-if="user.userPhone || user.userPhone.length == 0">
          <div class="title">电话</div>
          <div class="detail">未设置</div>
          <div class="operate">
            <a-button type="primary" @click="openPhoneModal('phone')">绑定手机</a-button>
          </div>
        </div>
        <div class="bind" v-else>
          <div class="title">电话</div>
          <!--user.userPhone.substring(0, 3)+"****"+user.userPhone.substr(user.userPhone.length-4)-->
          <div class="detail">{{user.userPhone}}</div>
          <div class="operate">
            <a-button type="primary" @click="openPhoneModal('phone')">更换手机</a-button>
          </div>
        </div>
      </li>
      <li class="item email ">
        <div class="unbind" v-if="user.userEmail || user.userEmail.length == 0">
          <div class="title">邮箱</div>
          <div class="detail">未设置</div>
          <div class="operate">
            <a-button type="primary" @click="openPhoneModal('email')">绑定</a-button>
          </div>
        </div>
        <div class="bind" v-else>
          <div class="title">邮箱</div>
          <div class="detail">{{user.userEmail}}</div>
          <div class="operate">
            <a-button type="primary" @click="unbindEmail()">解除绑定</a-button>
          </div>
        </div>
      </li>
      <li class="item name ">
        <div class="unbind" v-if="user.openid || user.openid.length == 0">
          <div class="title">微信</div>
          <div class="detail">未设置</div>
          <div class="operate">
            <a-button type="primary" @click="bindweixin()">绑定</a-button>
          </div>
        </div>
        <div class="bind" v-else>
          <div class="title">微信</div>
          <div class="detail">已设置</div>
          <div class="operate">
            <a-button type="primary" @click="unbindweixin()">解除绑定</a-button>
          </div>
        </div>
      </li>
      <li class="item password">
        <div class="bind">
          <div class="title">密码</div>
          <div class="detail">*****</div>
          <div class="operate">
            <a-button type="primary" @click="passVisible=true">修改密码</a-button>
          </div>
        </div>
      </li>
    </ul>
    <pass-modal ref="pass" :passVisible="passVisible" @onOk="passOnOk" @passVisibleClose="passVisibleChange"/>
    <phone-modal ref="phone" :phoneVisible="phoneVisible" :modalData="modalData" @onOk="phoneOnOk"
                 @phoneVisibleClose="phoneVisibleChange"/>
  </div>
</template>

<script>
  import PassModal from './modules/PassModal.vue'
  import PhoneModal from './modules/PhoneModal.vue'

  import {updatepwd, bindphone, bindemail, unbindemail, unbindweixin, getwxurl} from '../../axios/api'
  import {createLqtoken} from "../../common/js/createLqtoken";

  export default {
    name: 'UserAccountManage',
    data() {
      return {
        passVisible: false,
        phoneVisible: false,
        modalData: {},
        user: this.$qs.parse(this.$route.query.user),
        /*  个人
        user: {
          userId: 16158
          userEmail: null
          userPhone: "18800103652"
          openid: null
          faceUrl: "http://bug.lanqiao.cn:8808/upload/head.png"
          createTime: "2020-02-11 19:06"
          userStatus: 1
        }*/
      }
    },
    components: {PassModal, PhoneModal},
    methods: {
      openPhoneModal(type) {
        if (type == 'phone') {
          this.modalData = {
            title: '绑定手机号',
            type: 'phone'
          }
        } else if (type == 'email') {
          this.modalData = {
            title: '绑定邮箱',
            type: 'email'
          }
        }
        this.phoneVisible = true
      },
      passOnOk(pass) {
        let data = new FormData()
        data.append("newpwd", pass)
        data.append("lqtoken", this.$store.state.com.lqtoken)
        updatepwd(data).then(res => {
          if (res.data.code == 200) {
            this.$message.success("修改密码成功")
            this.$refs.pass.close()
          } else if (res.data.code == 1001) {
            let result = createLqtoken()
            if (result == 0) {
              this.passOnOk(pass)
            }
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      bindweixin() {
        // 获取绑定微信接口，并跳转
        let data = new FormData()
        data.append("lqtoken", this.$store.state.com.lqtoken)
        getwxurl(data).then(res => {
          if (res.data.code == 200) {
            window.location.href = res.data.wxurl
          } else if (res.data.code == 1001) {
            let result = createLqtoken()
            if(result == 0){
              this.bindweixin()
            }
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      phoneOnOk(phone, code) {
        let data = new FormData()
        data.append("userinputcode", code)
        data.append("lqtoken", this.$store.state.com.lqtoken)
        if (this.modalData.type == 'phone') {
          data.append("phone", phone)
          bindphone(data).then(res => {
            if (res.data.code == 200) {
              this.$message.success("绑定手机号成功")
              this.$refs.phone.close();
              this.$router.push({
                path: '/selfManage',
              })
            } else if (res.data.code == 1001) {
              let result = createLqtoken()
              if (result == 0) {
                this.phoneOnOk(phone, code)
              }
            } else {
              this.$message.error(res.data.msg)
            }
          })
        } else if (this.modalData.type == 'email') {
          data.append("email", phone)
          bindemail(data).then(res => {
            if (res.data.code == 200) {
              this.$message.success("绑定邮箱成功")
              this.$refs.phone.close();
              this.$router.push({
                path: '/selfManage',
              })
            } else if (res.data.code == 1001) {
              let result = createLqtoken()
              if (result == 0) {
                this.phoneOnOk(phone, code)
              }
            } else {
              this.$message.error(res.data.msg)
            }
          })
        }
      },
      passVisibleChange(v) {
        this.passVisible = v;
      },
      phoneVisibleChange(v) {
        this.phoneVisible = v;
      },
      //解绑邮箱
      unbindEmail() {
        let data = new FormData()
        data.append("lqtoken", this.$store.state.com.lqtoken)
        unbindemail(data).then(res => {
          if (res.data.code == 200) {
            this.$message.success("解绑邮箱成功")
            this.$router.push({
              path: '/selfManage',
            })
          } else if (res.data.code == 1001) {
            let result = createLqtoken()
            if (result == 0) {
              this.unbindEmail()
            }
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      //解绑微信
      unbindweixin() {
        let data = new FormData()
        data.append("lqtoken", this.$store.state.com.lqtoken)
        unbindweixin(data).then(res => {
          if (res.data.code == 200) {
            this.$message.success("解绑微信成功")
            this.$router.push({
              path: '/selfManage',
            })
          } else if (res.data.code == 1001) {
            let result = createLqtoken()
            if (result == 0) {
              this.unbindweixin()
            }
          } else {
            this.$message.error(res.data.msg)
          }
        })
      }
    }
  }
</script>

<style lang="less" scope>
  .account-manage {
    width: 916px;
    margin: 0 auto;
    padding: 34px 31px;
    background: rgba(255, 255, 255, 1);
    border-radius: 2px;

    .detail-title {
      font-size: 22px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      margin-bottom: 22px;
      color: rgba(51, 51, 51, 1);
      line-height: 30px;
      letter-spacing: 1px;
    }

    .detail-info {
      p {
        font-size: 5px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #666666;
        line-height: 24px;
      }
    }

    .safe-info {
      overflow: hidden;
      list-style: none;
      margin: 22px 0 0 0;
      padding: 0;

      .item {
        height: 79px;
        line-height: 79px;
        border-bottom: 1px solid #F2F6F7;
        background: #fff;
        padding-left: 16px;
        clear: both;
        vertical-align: middle;
        transition: all .2s ease-in-out;

        &:hover {
          background: rgba(215, 222, 228, 0.1);
        }

        div {
          float: left;
        }

        .title {
          width: 84px;
          font-size: 16px;
          font-weight: 500;
          color: rgba(102, 102, 102, 1);
        }

        .detail {
          width: 640px;
          font-size: 14px;
          font-weight: 400;
        }

        .operate {
          .ant-btn {
            width: 100px;
            height: 34px;
            border-radius: 2px;
            color: #333;
            font-size: 14px;
            border: 1px solid #E1E5ED;
            background: rgba(225, 229, 237, 1);

            &:hover {
              border: 1px solid #3E82FF;
              background: rgba(62, 130, 255, 1);
              color: #fff;
            }
          }
        }

        .bind {
          .detail {
            color: rgba(62, 130, 255, 1);
          }
        }

        .unbind {
          .detail {
            color: rgba(233, 84, 6, 1);
          }
        }
      }
    }
  }
</style>
