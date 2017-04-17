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
}

let createQuestion = (req, res) => {
  db.Question
    .create({UserId: Number(req.body.UserId), title_question: req.body.title_question, question: req.body.question})
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      res.send(err.message)
    })
}

let updateQuestion = (req, res) => {
  db.Question
    .findOne(
      {where: {id: req.params.id}}
    )
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      res.send(err.message)
    })
}

let updateQuestionById = (req, res) => {
  db.Question
    .update(
      {title_question: req.body.title_question, question: req.body.question},
      {where: {UserId: Number(req.body.UserId)}}
    )
    .then((result) => {
      db.Question
        .findAll({include: {model: db.Answer, include: [db.Comment]}})
        .then((resultQuestion) => {
          res.send(resultQuestion)
        })
        .catch((err) => {
          res.send(err.message)
        })
    })
    .catch((err) => {
      res.send(err.message)
    })
}

let deleteQuestion = (req, res) => {
  db.Question
    .destroy({where: {id: req.params.id}})
    .then((result) => {
      db.Answer
        .destroy({where: {QuestionId: req.params.id}})
        .then((resDelAnswer) => {
        })
        db.Question
          .findAll({include: {model: db.Answer, include: [db.Comment]}})
          .then((resultQuestion) => {
            res.send(resultQuestion)
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
  dataQuestion, createQuestion, updateQuestion, deleteQuestion, dataQuestionById, updateQuestionById
}
