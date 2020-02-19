<template>
  <div class="enter-reg-full">
    <account-header name="企业默认账号"/>
    <div class="content">
      <div class="title">
        <img src="~@/assets/img/succ-icon.png" alt="">
        <span>注册完成</span>
      </div>
      <p class="tips">您的会员名与默认密码<br/>会员名是企业的重要信息，请您妥善保管</p>
      <div class="copy-box">
        <div class="name-and-pass">
          <p>会员名：<span>{{loginid}}</span></p>
          <p>密码：<span>{{userpass}}</span></p>
        </div>
        <button class="copy" @click="toCopy">复制</button>
      </div>
      <a-button type="primary" class="bind" @click="login">确定并登录</a-button>
      <p class="tips light-tip">账号密码已发送到联系人手机中</p>
      <p class="tips light-tip">您可以在个人中心修改密码 <a href="#" @click="toSelfManage">登录并修改密码</a></p>
    </div>
  </div>
</template>

<script>
import AccountHeader from '../../components/AccountHeader.vue'
import {getUcenterInfo} from '../../axios/api'
export default {
  name: 'EnterpriseInfo',
  data (){
    return{
      usertype : 0,
      loginid:this.$route.query.loginid,
      userpass:this.$route.query.userpass,
    }
  },
  components:{AccountHeader},

  methods: {
    toCopy(){
      // 复制的方法---------start---------
      let oInput = document.createElement('input');
      oInput.value = "会员名："+ this.loginid +";\n  \t密码：" + this.userpass +";";
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象;
      document.execCommand("Copy"); // 执行浏览器复制命令
      this.$message.success('复制成功');
      oInput.remove()
      // 复制的方法---------end---------
    },
    login(){
      // this.$message.info('登录成功，返回backurl')
      window.location.href = this.$store.state.com.backurl
    },
    toSelfManage(){
      // this.$message.info('登录成功，去个人中心修改密码')
      this.$router.push({
        path: '/selfManage',
      })
    }
  }
}
</script>

<style lang="less" scope>
.enter-reg-full{
  p{
    margin-bottom: 0;
  }
  width: 768px;
  margin: 0 auto;
  padding-top: 114px;
  border-radius:6px;
  .content{
    text-align: center;
    background: #fff;
    padding-bottom: 69px; 
    .title{
      padding-top: 48px;
      margin-bottom: 39px;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        width: 30px;
        height: 30px;
        margin-right: 10px;
      }
      span{
        font-size:18px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(74,74,74,1);
        line-height:25px;
      }
    }
    .tips{
      font-size:14px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(74,74,74,1);
      line-height:20px;
    }
    .copy-box{
      display: flex;
      justify-content: space-between;
      width: 244px;
      height: 55px;
      background: rgba(216,216,216,.3);
      border: 1px solid rgba(151,151,151,.3);
      margin: 8px auto 36px auto;
      .name-and-pass{
        display: inline-block;
        float: left;
        padding: 6px;
        width: 183px;
        p{
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: left;
        }
      }
      .copy{
        font-size:14px;
        font-weight:500;
        color:rgba(62,130,255,1);
        width: 59px;
        height: 100%;
        text-align: center;
        border: none;
        background: #fff;
        outline: none;
        cursor: pointer;
      }
    }
    .bind{
      width: 270px;
      height: 34px;
      line-height: 34px;
      background: rgba(62,130,255,1);
      font-size: 14px;
      font-weight: 500;
      color: rgba(255,255,255,1);
      letter-spacing: 1px;
      margin-bottom: 22px;
    }
    .light-tip{
      color: #999999;
      a{
       color: #3E82FF; 
      }
    }
  }
}
</style>
