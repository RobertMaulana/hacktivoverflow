<template lang="html">
  <div class="animated fadeIn">
    <h1>Signup</h1>
    <el-row >
      <div class="form">
        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="Username" prop="username">
            <el-input type="text" auto-complete="off" v-model="user.username"></el-input>
          </el-form-item>
          <el-form-item
            prop="email"
            label="Email"
            :rules="[
              { required: true, message: 'Please input email address', trigger: 'blur' },
              { type: 'email', message: 'Please input correct email address', trigger: 'blur,change' }
            ]"
          >
            <el-input v-model="dynamicValidateForm.email"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="pass">
            <el-input type="password" auto-complete="off" v-model="user.password"></el-input>
          </el-form-item>
          <el-button class="btn-login" type="primary" @click="signUp()">Signup</el-button>
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
        email	: null,
        password: null
      },
      dynamicValidateForm: {
        domains: [{
          key: 1,
          value: ''
        }],
        email: ''
      }
    }
  },
  methods: {
    signUp() {
      var self = this;
      axios.post('http://localhost:3000/user/signup', {
        username: self.user.username,
        email: self.dynamicValidateForm.email,
        password: self.user.password
      })
      .then((res) => {
        this.open()
        this.$router.push('/')
      })
      .catch((err) => {
        console.log(err);
      })
    },
    open() {
      const h = this.$createElement;
      this.$notify({
        title: `Thankyou for joining Hacktivoverflow`,
        message: h('p', { style: 'color: green' }, 'Please activate link URL from your email')
      });
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
