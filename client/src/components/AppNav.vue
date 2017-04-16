<template lang="html">
  <el-row>
    <el-col :span="24">
      <div class="grid-content bg-purple-dark">
        <el-menu class="el-menu-demo" mode="horizontal">
          <router-link to="/"><el-menu-item index="1">Hacktivoverflow</el-menu-item></router-link>
          <div v-if="token">
            <el-menu-item style="float:right;" index="2" @click="logout">Logout</el-menu-item>
          </div>
          <div v-else>
            <router-link to="login"><el-menu-item style="float:right;" index="2">Login</el-menu-item></router-link>
            <router-link to="signup"><el-menu-item style="float:right;" index="3">Sign Up</el-menu-item></router-link>
          </div>
        </el-menu>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data(){
    return {
      token: false
    }
  },
  methods: {
    checkCookie(){
      if (this.$cookie.get("token") == null) {
        this.token = false
      }else {
        this.token = true
      }
    },
    logout(){
      this.$cookie.delete("token");
      window.localStorage.clear();
      window.location = "/";
    }
  },
  mounted: function(){
    this.checkCookie()
  }
}
</script>

<style lang="css">
</style>
