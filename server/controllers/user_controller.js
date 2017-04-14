const db    = require('../models'),
      hash  = require('password-hash');

let loginUser = (req, res) => {
  res.send(req.user.token);
}

let dataUser = (req, res) => {
  db.User
    .findAll({})
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      res.send(err.message)
    })
}

let createUser = (req, res) => {
  db.User
    .create(
      {username: req.body.username, email: req.body.email, password: hash.generate(req.body.password)}
    )
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      res.send(err.message)
    })
}

let updateUser = (req, res) => {
  db.User
    .update(
      {username: req.body.username, email: req.body.email, password: hash.generate(req.body.password)},
      {where: {id: req.params.id}}
    )
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      res.send(err.message)
    })
}

let deleteUser = (req, res) => {
  db.User
    .destroy(req.params.id)
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      res.send(err.message)
    })
}

module.exports = {
  loginUser, dataUser, createUser, updateUser, deleteUser
}
