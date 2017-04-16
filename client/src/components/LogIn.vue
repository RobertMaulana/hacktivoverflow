<template lang="html">
  <div class="animated fadeIn">
    <h1>Login</h1>
    <el-row >
      <div class="form">
        <el-form label-width="120px" class="demo-ruleForm">
          <el-form-item label="Username" prop="username">
            <el-input type="text" auto-complete="off" v-model="user.username"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="pass">
            <el-input type="password" auto-complete="off" v-model="user.password"></el-input>
          </el-form-item>
          <el-button class="btn-login" type="primary" @click="signIn()">Login</el-button>
        </el-form>
      </div>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return {
      user: {
        username	: null,
        password: null
      }
    }
  },
  methods: {
    signIn() {
      var self = this;
      axios.post('http://localhost:3000/user/login', {
        username: self.user.username,
        password: self.user.password
      })
      .then((res) => {
        window.localStorage.setItem('token', res.data.token);
        window.localStorage.setItem('user', res.data.username);
        window.localStorage.setItem('id', res.data.id);
        if (window.localStorage.getItem('user') !== "" || this.$cookie.get("token") != null) {
          this.$cookie.set("token", res.data.token, 1);
          // this.$router.push('/home')
          window.location = "/home";
        }else if(this.$cookie.get("token") == null){
          this.$router.push('/')
        }
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }
}
</script>

<style lang="css">
  .btn-login {
    float: right;
  }

  .form{
    width: 60%;
    margin: 0 auto;
  }
</style>
