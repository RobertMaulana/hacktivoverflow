const db = require('../models');
const firebase = require('firebase');

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
                  })
                  .catch((err) => {
                    res.send(err.message)
                  })
                  let data = {
                    vote: answers.vote,
                    message: "voted!"
                  }
                  res.send(data)
              })
          })
          .catch((err) => {
            res.send(err.message)
          })
      }else {
        res.send("sorry, you already vote to this answer!")
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
      // console.log(result[0].id);
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
                  })
                  .catch((err) => {
                    res.send(err.message)
                  })
                  let data = {
                    vote: answers.vote,
                    message: "downvote success!"
                  }
                  res.send(data)
              })
          })
      }else {
        res.send("You must upvote this answer first!")
      }
    })
    .catch((err) => {
      res.send(err.message)
    })
}

module.exports = {
  upvote, downvote
}
