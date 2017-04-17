<template lang="html">
  <div class="">
    <el-row :span="24">
      <div class="user">
        <p>Asked {{createdAt}} | <em style="font-size: 14px;"><b>by {{user}}</b></em></p>
      </div>
      <el-card class="box-card" style="background-color: #F5FCFF;">
        <div slot="header" class="clearfix">
          <span style="line-height: 36px;" v-model="title">{{title}}</span>
        </div>
        <div class="text item">
          <div class="question-result">
            <div class="questions">
              <p>{{question}}</p>
            </div>
          </div>
        </div>
      </el-card>
      <h3>Answers</h3>
      <el-card class="box-card" v-for="dataAnswer in answers" :key="dataAnswer.id">
        <div class="text item">
          <div class="question-result">
            <div class="questions">
              <p>{{dataAnswer.answer}}</p>
              <div class="vote">
                <div class="upvote">
                  <a href="#" v-on:click.prevent="upvote(dataAnswer.id)"><i class="el-icon-caret-top"></i></a>
                </div>
                <div class="commentCount">
                  <i class=""> {{ dataAnswer.vote }} </i>
                </div>
                <div class="downvote">
                  <a href="#" v-on:click.prevent="downvote(dataAnswer.id)"><i class="el-icon-caret-bottom"></i></a>
                </div>
              </div>
            </div>
            <h5></h5>
            <ul>
              <!-- <li></li> -->
            </ul>
            <hr>
            <el-button type="primary" icon="edit" @click="openModalComment(dataAnswer.id)">Comment</el-button>
          </div>
        </div>
      </el-card>
      <el-dialog title="Comment" v-model="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="Comment" prop="desc">
            <el-input type="textarea" v-model="comment"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="sendComment">Submit</el-button>
        </span>
      </el-dialog>
      <el-card class="box-card">
        <el-form label-width="100px" class="demo-ruleForm">
          <el-form-item label="Answer" prop="desc">
            <el-input type="textarea" v-model="dataSubmit.dataAnswer"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitAnswer()">Submit</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: function(){
    return {
      user      : '',
      createdAt : '',
      title     : '',
      question  : '',
      answers   : [],
      vote      : '',
      comments  : [],
      dataSubmit: {
        QuestionId  : this.$route.query.id,
        dataAnswer  : ''
      },
      dialogFormVisible: false,
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
      formLabelWidth  : '120px',
      answerId        : '',
      comment         : '',
      vote            : 0

    }
  },
  methods: {
    checkCookie(){
      if (this.$cookie.get("token") == null) {
        this.$router.push('/')
      }
    },
    submitAnswer(){
      var self = this;
      axios.post('http://localhost:3000/answer/', {
        QuestionId    : self.dataSubmit.QuestionId,
        answer        : self.dataSubmit.dataAnswer,
        title_question: self.title,
        UserId        : window.localStorage.getItem('id')
      },{headers: {'token': window.localStorage.getItem('token')}})
      .then((res) => {
        self.clearInput()
        self.open()
        self.answers.push(res.data)
      })
      .catch((err) => {
        console.log(err);
      })
    },
    openModalComment(answerId){
      this.dialogFormVisible = true
      this.answerId = answerId
    },
    open(string="answer") {
      const h = this.$createElement;
      if (string == "answer") {
        this.$notify({
          title: `Thankyou ${window.localStorage.getItem('user')}`,
          message: h('p', { style: 'color: green' }, 'Send Answers Succesfull!')
        });
      }else if (string == "already-vote") {
        this.$notify({
          title: `Weiitzzz! ${window.localStorage.getItem('user')}`,
          message: h('p', { style: 'color: red' }, 'Sorry you have already vote this answer!')
        });
      }else if (string == "voted!") {
        this.$notify({
          title: `Thankyou ${window.localStorage.getItem('user')}`,
          message: h('p', { style: 'color: green' }, 'You have been voted to this answer!')
        });
      }else if (string == "failDownvote!") {
        this.$notify({
          title: `Wuuuuppsss!!!`,
          message: h('p', { style: 'color: red' }, 'You must upvote this answer first!')
        });
      }else if (string == "downvote!") {
        this.$notify({
          title: `Wuuuuppsss!!!`,
          message: h('p', { style: 'color: green' }, 'You have been downvote to this answer!')
        });
      }else {
        this.$notify({
          title: `Thankyou ${window.localStorage.getItem('user')}`,
          message: h('p', { style: 'color: green' }, 'Send Comment Succesfull!')
        });
      }
    },
    sendComment(){
      var self = this;
      axios.post('http://localhost:3000/comment/', {
        AnswerId  : self.answerId,
        comment   : self.comment,
        UserId    : window.localStorage.getItem('id')
      },{headers  : {'token': window.localStorage.getItem('token')}})
      .then((res) => {
        self.clearInputComment()
        self.open("comment")
        self.dialogFormVisible = false
      })
      .catch((err) => {
        console.log(err);
      })
    },
    clearInput(){
      this.dataSubmit.dataAnswer = ''
    },
    clearInputComment(){
      this.comment = ''
    },
    upvote(id){
      var self = this;
      axios.post('http://localhost:3000/vote/upvote/', {
        QuestionId: this.$route.query.id,
        AnswerId: id,
        UserId: window.localStorage.getItem('id'),
        UserName: window.localStorage.getItem('user')
      },{headers: {'token': window.localStorage.getItem('token')}})
      .then((res) => {
        // console.log(res.data);
        self.user       = res.data.username
        self.createdAt  = res.data.createdAt
        self.title      = res.data.data.title_question
        self.question   = res.data.data.question
        self.answers    = res.data.dataAnswers
        if (res.data.message == "sorry, you already vote to this answer!") {
          self.open("already-vote")
        }else {
          self.open("voted!")
        }
      })
      .catch((err) => {
        console.log(err);
      })
    },
    downvote(id){
      var self = this;
      axios.post('http://localhost:3000/vote/downvote/', {
        QuestionId: this.$route.query.id,
        AnswerId: id,
        UserId: window.localStorage.getItem('id'),
        UserName: window.localStorage.getItem('user')
      },{headers: {'token': window.localStorage.getItem('token')}})
      .then((res) => {

        self.user       = res.data.username
        self.createdAt  = res.data.createdAt
        self.title      = res.data.data.title_question
        self.question   = res.data.data.question
        self.answers    = res.data.dataAnswers
        if (res.data.message == "You must upvote this answer first!") {
          self.open("failDownvote!")
        }else {
          self.open("downvote!")
        }
      })
      .catch((err) => {
        console.log(err);
      })
    },
    getDetailById(){
      var self = this;
      axios.get('http://localhost:3000/question/'+this.$route.query.id, {headers: {'token': window.localStorage.getItem('token')}})
      .then((res) => {
        self.user       = res.data.username
        self.createdAt  = res.data.createdAt
        self.title      = res.data.data.title_question
        self.question   = res.data.data.question
        self.answers    = res.data.dataAnswers
      })
      .catch((err) => {
        console.log(err);
      })

    }

  },
  mounted: function(){
    this.checkCookie()
    this.getDetailById()
  }
}
</script>

<style lang="css" scoped>
  .el-button+.el-button {
    margin-right: 10px;
  }
  .user {
    font-size: 12px;
    margin-top: 30px;
  }
  button {
    float: right;
    margin-bottom: 15px;
  }
  .vote{
    top: 100;
    float: right;
    position: absolute;
    right: 30px;
    margin-top: -30px;
  }
  .el-textarea__inner{
    height: 200px !important;
  }
  .questions {
    background-color: #EDEDED;
    height: 300px;
  }
  .questions p{
    padding: 5px;
    margin: 0 5px;
  }
  .user{
    text-align: left;
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
</style>
