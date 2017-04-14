const db = require('../models');

let dataQuestion = (req, res) => {
  db.Question
    .findAll({})
    .then((result) => {
      res.send(result)
      // res.render("question", {data: result})
    })
    .catch((err) => {
      res.send(err.message)
    })
}

let dataQuestionById = (req, res) => {
  db.Question
    .findById(req.params.id, {include: {model: db.Answer, include: [db.Comment]}})
    .then((result) => {
      res.send(result)
      // res.render("singleQuestion", {data: result})
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
