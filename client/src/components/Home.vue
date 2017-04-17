<template lang="html">
  <div class="">
    <el-row :span="24">
      <el-button type="primary" id="createQuestion" icon="edit" @click="createQuestion()">Create Question</el-button>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="line-height: 36px;"><h3>Question Results</h3></span>
        </div>
        <div v-for="question in questions" class="text item">
          <div class="question-result">
            <!-- Total Answers: {{question.Answers.length}} -->
            <h3> Title: {{ question.title_question }} </h3>
            <span>User: {{ question.UserId }}</span><br>
            <el-button type="primary" icon="circle-check" @click="detailQuestion(question.id)">Answer</el-button>
            <el-button type="warning" icon="edit" @click="updateQuestion(question.id)">Update</el-button>
            <el-button type="danger" icon="delete" @click="deleteQuestion(question.id, question.UserId)">Delete</el-button>
          </div>
          <hr>
        </div>
      </el-card>
      <el-dialog title="Create Question" v-model="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="" prop="desc">
            <el-input placeholder="Title question" v-model="title"></el-input>
          </el-form-item>
          <el-form-item label="" prop="desc">
            <el-input placeholder="Question" type="textarea" v-model="question"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="submitQuestion()">Submit</el-button>
        </span>
      </el-dialog>
      <el-dialog title="Update Question" v-model="dialogFormVisibleUpdate">
        <el-form>
          <el-form-item label="" prop="desc">
            <el-input placeholder="Title question" v-model="title_update"></el-input>
          </el-form-item>
          <el-form-item label="" prop="desc">
            <el-input placeholder="Question" type="textarea" v-model="question_update"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleUpdate = false">Cancel</el-button>
          <el-button type="primary" @click="submitUpdateQuestion()">Submit</el-button>
        </span>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: function(){
    return {
      questions: [],
      dataSubmit: {
        QuestionId  : this.$route.query.id,
        dataAnswer  : ''
      },
      dialogFormVisible: false,
      dialogFormVisibleUpdate: false,
      title: '',
      question: '',
      form: {
        name    : '',
        region  : '',
        date1   : '',
        date2   : '',
        delivery: false,
        type    : [],
        resource: '',
        desc    : ''
      },
      title_update: '',
      question_update: '',
      question_id_update: ''
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
      })
      .catch((err) => {
        console.log(err);
      })
    },
    detailQuestion(id){
      this.$router.push({ path: '/detail',query: {id: id} })
    },
    createQuestion(){
      this.dialogFormVisible = true
    },
    submitQuestion(){
      var self = this;
      axios.post('http://localhost:3000/question/', {
        title_question  : self.title,
        question        : self.question,
        UserId          : window.localStorage.getItem('id')
      },{headers: {'token': window.localStorage.getItem('token')}})
      .then((res) => {
        console.log(res.data);
        self.questions.push(res.data)
        self.clearInput()
        self.dialogFormVisible = false
        self.open()
      })
      .catch((err) => {
        console.log(err);
      })
    },
    updateQuestion(id){
      this.dialogFormVisibleUpdate = true
      var self = this;
      axios.get('http://localhost:3000/question/edit/'+id, {headers: {'token': window.localStorage.getItem('token')}})
      .then((res) => {
        self.title_update = res.data.title_question
        self.question_update = res.data.question
        self.question_id_update = id
      })
      .catch((err) => {
        console.log(err);
      })
    },
    submitUpdateQuestion(){
      var self = this;
      axios.post('http://localhost:3000/question/update/', {
        id              : self.question_id_update,
        title_question  : self.title_update,
        question        :self.question_update,
        UserId          : window.localStorage.getItem('id')
      },{headers: {'token': window.localStorage.getItem('token')}})
      .then((res) => {
        self.dialogFormVisibleUpdate = false
        self.questions = res.data
        self.open("updated")
      })
      .catch((err) => {
        console.log(err);
      })
    },
    deleteQuestion(id, UserId){
      let conf = confirm("Are you sure?")
      if (conf) {
        var self = this;
        if (window.localStorage.getItem('id') == UserId) {
          axios.delete('http://localhost:3000/question/'+id,{headers: {'token': window.localStorage.getItem('token')}})
          .then((res) => {
            self.dialogFormVisibleUpdate = false
            self.questions = res.data
            self.open("deleted")
          })
          .catch((err) => {
            console.log(err);
          })
        }else {
          self.open("not authorized!")
        }

      }
    },
    open(option="created") {
      const h = this.$createElement;
      if (option=="created") {
        this.$notify({
          title: `Thankyou ${window.localStorage.getItem('user')}`,
          message: h('p', { style: 'color: green' }, 'Question has been created!'),
          type: 'success'
        });
      }else if(option=="updated"){
        this.$notify({
          title: `Yuuuuhhuuuu!`,
          message: h('p', { style: 'color: green' }, 'Question has been updated!'),
          type: 'success'
        });
      }else if(option=="not authorized!"){
        this.$notify({
          title: `Wuuuupppzzzz!!`,
          message: h('p', { style: 'color: red' }, 'You are not authorized to delete this question!'),
          type: 'error'
        });
      }else if(option=="deleted"){
        this.$notify({
          title: `Yuuuhuuuu!!`,
          message: h('p', { style: 'color: red' }, 'Your question has been deleted!!'),
          type: 'error'
        });
      }

    },
    clearInput(){
      this.title = ''
      this.question = ''
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
