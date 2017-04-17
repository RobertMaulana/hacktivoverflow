const db = require('../models');
const firebase = require('firebase');
const moment = require("moment");

let dataAnswer = (req, res) => {
  db.Answer
    .findAll({})
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      res.send(err.message)
    })
}

let createAnswer = (req, res) => {
  firebase.database().ref('answer/').set({
    title_question: req.body.title_question,
    answer: req.body.answer,
    timeStamps: (new Date().getTime()).toString(),
  });
  db.Answer
    .create(
      {QuestionId: Number(req.body.QuestionId), answer: req.body.answer, vote: 0, UserId: req.body.UserId})
    .then((result) => {
      db.Question
        .findOne(
          {id: Number(req.body.QuestionId), title_question: req.body.title_question}
        )
        .then((dataQuestions) => {
          if (req.body.comment != null || req.body.comment != "") {
            db.Comment
              .create(
                {AnswerId: result.id, comment: req.body.comment, UserId: dataQuestions.UserId}
              )
              .then((commentDone) => {
                // res.send(commentDone)
              })
              .catch((err) => {
                res.send(err.message)
              })
          }else {
            // res.send(dataQuestions)
          }
          res.send(result)

        })
    })
    .catch((err) => {
      res.send(err.message)
    })
}

let updateAnswer = (req, res) => {
  db.Answer
    .findById(req.params.id)
    .then((result) => {
      res.send(result)
      // res.render("updateAnswer", {data: result})
    })
    .catch((err) => {
      res.send(err.message)
    })
}

let updateAnswerFinal = (req, res) => {
  db.Answer
    .update(
      {answer: req.body.answer},
      {where: {id: req.params.id}}
    )
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      res.send(err.message)
    })
}

let deleteAnswer = (req, res) => {
  db.Answer
    .destroy({where: {id: req.body.AnswerId}})
    .then((result) => {
      db.Question
        .findById(req.body.QuestionId, {include: {model: db.User}})
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
              let detailQuestion = {
                data: result,
                username: result.User.username,
                createdAt: moment(result.createdAt).format("YYYY MMMM DD HH:mm:ss"),
                dataAnswers: dataAnswer,
              }
              res.send(detailQuestion)
            })

        })
        .catch((err) => {
          res.send(err.message)
        })
    })
    .catch((err) => {
      res.send(err.message)
    })
}

module.exports = {
  dataAnswer, createAnswer, updateAnswer, deleteAnswer, updateAnswerFinal
}
