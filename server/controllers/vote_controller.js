const db = require('../models');
const firebase = require('firebase');
const moment = require("moment");

let upvote = (req, res) => {
  db.Vote
    .findAll({where: {AnswerId: req.body.AnswerId}})
    .then((votes) => {
      if (votes == "") {
        db.Vote
          .create({AnswerId: req.body.AnswerId, UserVote: req.body.UserName, UserIdVote: req.body.UserId})
          .then((result) => {
            db.Answer
              .findOne({where: {id: req.body.AnswerId}})
              .then((answers) => {
                db.Answer
                  .update(
                    {vote: answers.vote + 1},
                    {where: {id: req.body.AnswerId}}
                  )
                  .then((voteUpdated) => {
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
              })
          })
          .catch((err) => {
            res.send(err.message)
          })
      }else {
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
                  message: "sorry, you already vote to this answer!"
                }
                res.send(detailQuestion)
              })

          })
          .catch((err) => {
            res.send(err.message)
          })
      }
      // res.send(votes)
    })
    .catch((err) => {
      res.send(err.message)
    })
}

let downvote = (req, res) => {
  db.Vote
    .findAll({where: {AnswerId: req.body.AnswerId, UserIdVote: req.body.UserId}})
    .then((result) => {
      if (result != "") {
        db.Vote
          .destroy({where: {id: result[0].id}})
          .then((destroyVote) => {
            db.Answer
              .findOne({where: {id: req.body.AnswerId}})
              .then((answers) => {
                db.Answer
                  .update(
                    {vote: answers.vote - 1},
                    {where: {id: req.body.AnswerId}}
                  )
                  .then((voteUpdated) => {
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
              })
          })
      }else {
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
                  message: "You must upvote this answer first!"
                }
                res.send(detailQuestion)
              })

          })
          .catch((err) => {
            res.send(err.message)
          })
      }
    })
    .catch((err) => {
      res.send(err.message)
    })
}

module.exports = {
  upvote, downvote
}
