const db = require('../models');
const moment = require("moment");

let dataQuestion = (req, res) => {
  db.Question
    .findAll({include: {model: db.Answer, include: [db.Comment]}})
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      res.send(err.message)
    })
}

let dataQuestionById = (req, res) => {
  db.Question
    // .findById(req.params.id, {include: {model: db.Answer, include: [db.Comment]}})
    .findById(req.params.id, {include: {model: db.User}})
    .then((result) => {
      let fullDataAnswer = []
      let fullDataComment = []
      db.Answer
        .findAll({
           where: {
               QuestionId: result.id
           },
           include: [
               { model: db.Comment }
           ]
        })
        .then((dataAnswer) => {
          // console.log(dataAnswer);
          // dataAnswer.forEach((answers) => {
          //   // answers.Comments.forEach((comments) => {
          //   //   // console.log(comments.comment);
          //   //   // fullDataComment.push(comments.comment)
          //   //   console.log(comments.comment);
          //   // })
          //   // answers["newComment"] = "tes"
          //   fullDataAnswer.push(answers)
          //
          //
          // })
          let detailQuestion = {
            data: result,
            username: result.User.username,
            createdAt: moment(result.createdAt).format("YYYY MMMM DD HH:mm:ss"),
            dataAnswers: dataAnswer,
            // comments: fullDataComment
          }
          res.send(detailQuestion)
        })

    })
    .catch((err) => {
      res.send(err.message)
    })
}

let createQuestion = (req, res) => {
  // console.log(req.body);
  db.Question
    .create(req.body)
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      res.send(err.message)
    })
}

let updateQuestion = (req, res) => {
  db.Question
    .update(
      {title_question: req.body.title_question, question: req.body.question},
      {where: {id: req.params.id}}
    )
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      res.send(err.message)
    })
}

let deleteQuestion = (req, res) => {
  db.Question
    .destroy(req.params.id)
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      res.send(err.message)
    })
}

module.exports = {
  dataQuestion, createQuestion, updateQuestion, deleteQuestion, dataQuestionById
}
