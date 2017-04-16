<template lang="html">
  <div class="">
    <el-row :span="24">
      <div class="welcome-img">
        <img class="animated slideInUp" src="http://i.imgur.com/SSrcUIi.png" alt="home-picture">
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    checkCookie(){
      if (this.$cookie.get("token") == null) {
        this.$router.push('/')
      }else {
        this.$router.push('/home')
      }
    }
  },
  mounted: function(){
    this.checkCookie()
  }
}
</script>

<style lang="css" scoped>
  .welcome-img {
    width: 80%;
    margin: 0 auto;
  }
  img {
    margin-top: 15%;
    width: 100%;
  }
  .fade-enter-active, .fade-leave-active {
  transition: opacity .5s
  }
</style>
