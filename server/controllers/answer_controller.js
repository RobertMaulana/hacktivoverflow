const db = require('../models');

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
  db.Answer
    .create(
      {QuestionId: Number(req.body.id_question), answer: req.body.answer, vote: 0})
    .then((result) => {
      db.Question
        .findOne(
          {id: Number(req.body.id_question), title_question: req.body.title_question}
        )
        .then((dataQuestions) => {
          db.Comment
            .create(
              {AnswerId: result.id, comment: req.body.comment, UserId: dataQuestions.UserId}
            )
            .then((commentDone) => {
              res.send(commentDone)
            })
            .catch((err) => {
              res.send(err.message)
            })
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

let upvoteAnswer = (req, res) => {
  db.Answer
    .findById(req.params.id)
    .then((result) => {
        result.vote += 1;
        db.Answer
          .update(
            {vote: result.vote},
            {where: {id: req.params.id}}
          )
          .then((result) => {
            res.send(result)
          })
          .catch((err) => {
            res.send(err.message)
          })
    })
    .catch((err) => {
      res.send(err.message)
    })
}

let downvoteAnswer = (req, res) => {
  db.Answer
    .findById(req.params.id)
    .then((result) => {
        result.vote -= 1;
        db.Answer
          .update(
            {vote: result.vote},
            {where: {id: req.params.id}}
          )
          .then((res) => {
            res.send(res)
          })
          .catch((err) => {
            res.send(err.message)
          })
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
  dataAnswer, createAnswer, updateAnswer, deleteAnswer, updateAnswerFinal, upvoteAnswer, downvoteAnswer
}
