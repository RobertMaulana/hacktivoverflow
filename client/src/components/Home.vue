<template lang="html">
  <div class="">
    <el-row :span="24">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="line-height: 36px;"><h3>Question Results</h3></span>
        </div>
        <div v-for="question in questions" class="text item">
          <div class="question-result">
            Total Answers: {{question.Answers.length}}
            <h3> Title: {{ question.title_question }} </h3>
            <span>User: {{ question.UserId }}</span><br>
            <el-button type="primary" icon="edit" @click="detailQuestion(question.id)">Answer</el-button>
          </div>
          <hr>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: function(){
    return {
      questions: [],
    }
  },
  methods: {
    checkCookie(){
      if (this.$cookie.get("token") == null) {
        this.$router.push('/')
      }
    },
    allQuestions(){
      var self = this;
      axios.get('http://localhost:3000/question', {headers: {'token': window.localStorage.getItem('token')}})
      .then((res) => {
        self.questions = res.data
        console.log(self.questions);
      })
      .catch((err) => {
        console.log(err);
      })
    },
    detailQuestion(id){
      this.$router.push({ path: '/detail',query: {id: id} })
    }
  },
  mounted: function(){
    this.checkCookie()
    this.allQuestions()
  }
}
</script>

<style lang="css" scoped>
  button {
    margin-top: 15px;
  }
  .question-result{
    display: block;
  }
  .text {
    text-align: left !important;
  }
  .box-card{
    width: 100% !important;
    margin-top: 2%;
  }
  .fade-enter-active, .fade-leave-active {
  transition: opacity .5s
  }
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }

  .box-card {
    width: 480px;
  }
</style>
