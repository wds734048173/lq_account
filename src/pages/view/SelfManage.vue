<!-- 个人中心中间键 可以分配到不同的页面-->
<template>
  <div>

  </div>
</template>

<script>
  import {getUcenterInfo} from '../../axios/api'

  export default {
    name: "SelfManage",
    created() {
      this.initInfo()
    },
    methods: {
      initInfo() {
        let data = new FormData()
        data.append("lqtoken", this.$store.state.com.lqtoken)
        getUcenterInfo(data).then(res => {
          if (res.data.code == 200) {
            let usertype = res.data.usertype
            let user = res.data.user
            if (usertype == 0) {//个人
              this.$router.push({
                path: '/userAccountManage',
                query: {
                  user : this.$qs.stringify(user)
                }
              });
            } else if (usertype == 1) {//企业
              this.$router.push({
                path: '/entAccountManage',
                query: {
                  user: this.$qs.stringify(user)
                }
              });
            } else if (usertype == 2) {// 院校
              alert("院校无个人中心")
            }
          } else if (res.data.code == 1001) {
            let result = createLqtoken()
            if(result == 0){
              this.initInfo()
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
