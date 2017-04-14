const db = require('../models');

let dataComment = (req, res) => {
  db.Comment
    .findAll({})
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      res.send(err.message)
    })
}

let createComment = (req, res) => {
  db.Comment
    .create(req.body)
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      res.send(err.message)
    })
}

let updateComment = (req, res) => {
  db.Comment
    .update(
      {comment: req.body.comment},
      {where: {id: req.params.id}}
    )
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      res.send(err.message)
    })
}

let deleteComment = (req, res) => {
  db.Comment
    .destroy(req.params.id)
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      res.send(err.message)
    })
}

module.exports = {
  dataComment, createComment, updateComment, deleteComment
}
