const db = require('../models');
const firebase = require('firebase');

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
    .destroy(req.params.id)
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      res.send(err.message)
    })
}

module.exports = {
  dataAnswer, createAnswer, updateAnswer, deleteAnswer, updateAnswerFinal
}
