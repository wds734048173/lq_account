<template>
  <div class="account-manage">
    <h1 class="detail-title">账户管理</h1>
    <div class="detail-info">
      <p>{{user.companyName}}</p>
      <p>会员名 <span>{{user.userLoginid}}</span></p>
    </div>
    <ul class="safe-info">
      <li class="item password">
        <div class="bind">
          <div class="title">密码</div>
          <div class="detail">*****</div>
          <div class="operate">
            <a-button type="primary" @click="passVisible=true">修改</a-button>
          </div>
        </div>
      </li>
      <li class="item name ">
        <div class="unbind" v-if="user.linkman.length == 0">
          <div class="title">姓名</div>
          <div class="detail">未设置</div>
          <div class="operate">
            <a-button type="primary" @click="nameVisible=true">绑定</a-button>
          </div>
        </div>
        <div class="bind" v-else>
          <div class="title">姓名</div>
          <div class="detail">{{user.linkman}}</div>
          <div class="operate">
            <a-button type="primary" @click="nameVisible=true">修改</a-button>
          </div>
        </div>
      </li>
      <li class="item phone ">
        <div class="unbind" v-if="user.userPhone.length == 0">
          <div class="title">电话</div>
          <div class="detail">未设置</div>
          <div class="operate">
            <a-button type="primary" @click="openPhoneModal('phone')">绑定</a-button>
          </div>
        </div>
        <div class="bind" v-else>
          <div class="title">电话</div>
          <!--user.userPhone.substring(0, 3)+"****"+user.userPhone.substr(user.userPhone.length-4)-->
          <div class="detail">{{user.userPhone}}</div>
          <div class="operate">
            <a-button type="primary" @click="openPhoneModal('phone')">修改</a-button>
          </div>
        </div>
      </li>
      <li class="item email ">
        <div class="unbind" v-if="user.userEmail.length == 0">
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
            <a-button type="primary" @click="openPhoneModal('email')">修改</a-button>
          </div>
        </div>
      </li>
    </ul>
    <pass-modal ref="pass" :passVisible="passVisible" @onOk="passOnOk" @passVisibleClose="passVisibleChange"/>
    <name-modal ref="name" :nameVisible="nameVisible" @onOk="nameOnOk" @nameVisibleClose="nameVisibleChange"/>
    <phone-modal ref="phone" :phoneVisible="phoneVisible" :modalData="modalData" @onOk="phoneOnOk"
                 @phoneVisibleClose="phoneVisibleChange"/>
  </div>
</template>

<script>
  import PassModal from './modules/PassModal.vue'
  import NameModal from './modules/NameModal.vue'
  import PhoneModal from './modules/PhoneModal.vue'

  import {updatepwd,updatelinkman,bindphone,bindemail} from '../../axios/api'
  import {createLqtoken} from "../../common/js/createLqtoken";

  export default {
    name: 'EntAccountManage',
    data() {
      return {
        passVisible: false,
        nameVisible: false,
        phoneVisible: false,
        modalData: {},
        user: this.$qs.parse(this.$route.query.user),
        /* 公司{
         "userId": 16154,
         "userLoginid": "GXLQ00010000",
         "userEmail": null,
         "userPhone": "13520601003",
         "openid": null,
         "linkman": "联系人",
         "companyName": "公司名称",
         "createTime": "2020-02-09 10:45",
         "userStatus": 1
       }*/
      }
    },
    components: {PassModal, NameModal, PhoneModal},
    methods: {
      openPhoneModal(type) {
        if (type == 'phone') {
          this.modalData = {
            title: '修改手机号',
            type: 'phone'
          }
        } else if (type == 'email') {
          this.modalData = {
            title: '修改邮箱',
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
            this.$message.success("密码修改成功")
            this.$refs.pass.close()
          } else if (res.data.code == 1001) {
            let result = createLqtoken()
            if(result == 0){
              this.passOnOk(pass)
            }
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      nameOnOk(name) {
        this.$message.info(name)
        let data = new FormData()
        data.append("linkman", name)
        data.append("lqtoken", this.$store.state.com.lqtoken)
        updatelinkman(data).then(res => {
          if (res.data.code == 200) {
            this.$message.success("绑定联系人成功")
            this.$refs.name.close()
            this.$router.push({
              path: '/selfManage',
            })
          } else if (res.data.code == 1001) {
            let result = createLqtoken()
            if(result == 0){
              this.nameOnOk(name)
            }
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      phoneOnOk(phone,code){
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
              if(result == 0){
                this.phoneOnOk(phone,code)
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
              if(result == 0){
                this.phoneOnOk(phone,code)
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
      nameVisibleChange(v) {
        this.nameVisible = v;
      },
      phoneVisibleChange(v) {
        this.phoneVisible = v;
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
