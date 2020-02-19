<template>
  <div>
    <!--绑定微信返回页：http://dev.lanqiao.cn/wxbind-->
  </div>
</template>

<script>
  import {bindwx} from "../../axios/api";

  export default {
    name: "WxBind",
    data() {
      return {
        code: 1,
        state: 0,
      }
    },
    activated() {
      this.getWxbackparams();
      setTimeout(()=>{
        this.bandWeixin()
      }, 1000);
    },
    methods: {
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
      // 绑定微信
      bandWeixin() {
        let data = new FormData()
        data.append("code", this.code)
        // data.append("state", this.state + "," + this.$store.state.com.lqtoken)
        data.append("state", this.state)
        data.append("lqtoken", this.$store.state.com.lqtoken)
        bindwx(data).then(res => {
          if (res.data.code == 200) {
            console.log("微信绑定成功")
            this.$router.push({
              path: '/selfManage',
            })
          } else if (res.data.code == 1001) {
            let result = createLqtoken()
            if (result == 0) {
              this.bandWeixin()
            }
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
