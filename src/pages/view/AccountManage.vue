<template>
  <div class="account-manage">
    <h1 class="detail-title">账户管理</h1>
    <div class="detail-info">
      <p>北京华宇信息技术有限公司</p>
      <p>会员名 <span>GXLQEDsPk3yt</span></p>
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
        <div class="unbind">
          <div class="title">姓名</div>
          <div class="detail">未设置</div>
          <div class="operate">
            <a-button type="primary" @click="nameVisible=true">绑定</a-button>
          </div>
        </div>
      </li>
      <li class="item phone ">
        <div class="bind">
          <div class="title">电话</div>
          <div class="detail">138****8293</div>
          <div class="operate">
            <a-button type="primary" @click="openPhoneModal('phone')">修改</a-button>
          </div>
        </div>
      </li>
      <li class="item email ">
        <div class="bind">
          <div class="title">邮箱</div>
          <div class="detail">ant***alipay.com</div>
          <div class="operate">
            <a-button type="primary" @click="openPhoneModal('email')">修改</a-button>
          </div>
        </div>
      </li>
    </ul>
    <pass-modal :passVisible="passVisible" @onOk="passOnOk" @passVisibleClose="passVisibleChange"/>
    <name-modal :nameVisible="nameVisible" @onOk="nameOnOk" @nameVisibleClose="nameVisibleChange"/>
    <phone-modal :phoneVisible="phoneVisible" :modalData="modalData" @onOk="phoneOnOk" @phoneVisibleClose="phoneVisibleChange"/>
  </div>
</template>

<script>
import PassModal from './modules/PassModal.vue'
import NameModal from './modules/NameModal.vue'
import PhoneModal from './modules/PhoneModal.vue'
export default {
  name: 'AccountManage',
  data (){
    return{
      passVisible: false,
      nameVisible: false,
      phoneVisible:false,
      modalData:{}
    }
  },
  components:{ PassModal,NameModal,PhoneModal },
  methods: {
    openPhoneModal(type){
      if(type=='phone'){
        this.modalData={
          title:'修改手机号',
          type:'phone'
        }
      }else if(type=='email'){
        this.modalData={
          title:'修改邮箱',
          type:'email'
        }
      }
      this.phoneVisible = true
    },
    passOnOk(pass,repass){
      this.$message.info(pass+','+repass)
      this.passVisible = false
    },
    nameOnOk(name){
      this.$message.info(name)
      this.nameVisible = false
    },
    phoneOnOk(phone,code){
      this.$message.info(phone+','+code)
      this.phoneVisible = false
    },
    passVisibleChange(v){
      this.passVisible = v;
    },
    nameVisibleChange(v){
      this.nameVisible = v;
    },
    phoneVisibleChange(v){
      this.phoneVisible = v;
    }
  }
}
</script>

<style lang="less" scope>
.account-manage{
  width:916px;
  margin: 0 auto;
  padding: 34px 31px;
  background:rgba(255,255,255,1);
  border-radius:2px;
  .detail-title{
    font-size:22px;
    font-family:PingFangSC-Medium,PingFang SC;
    font-weight:500;
    margin-bottom: 22px;
    color:rgba(51,51,51,1);
    line-height:30px;
    letter-spacing:1px;
  }
  .detail-info{
    p{
      font-size: 15px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #666666;
      line-height: 24px;
    }
  }
  .safe-info{
    overflow: hidden;
    list-style: none;
    margin: 22px 0 0 0;
    padding: 0;
    .item {
      height:79px;
      line-height: 79px;
      background:#fff;
      clear: both;
      vertical-align: middle;
      transition: all .2s ease-in-out;
      &:hover{
      background:rgba(215,222,228,0.1);
      }
      div{
        float: left;
      }
      .title{
        width: 84px;
        font-size:16px;
        font-weight:500;
        color:rgba(102,102,102,1);
      }
      .detail{
        width: 640px;
        font-size:14px;
        font-weight:400;
      }
      .operate{
        .ant-btn{
          width:100px;
          height:34px;
          border-radius:2px;
          color: #333;
          font-size:14px;
          border: 1px solid #E1E5ED;
          background:rgba(225,229,237,1);
          &:hover{
            border: 1px solid #3E82FF;
            background:rgba(62,130,255,1);
            color: #fff;
          }
        }
      }
      .bind{
        .detail{
          color:rgba(62,130,255,1);
        }
      }
      .unbind{
        .detail{
          color:rgba(233,84,6,1);
        }
      }
    }
  }
}
</style>