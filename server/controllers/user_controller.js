const db    = require('../models'),
      hash  = require('password-hash'),
      nodemailer = require('nodemailer')
require('dotenv').config();

let loginUser = (req, res, next) => {
  res.send(req.user);
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
  let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: "maulana.robert.mr@gmail.com",
          pass: "pgg773sG56"
      }
  });

  let num = hash.generate(req.body.password);
  let uniqueNumber = num.slice(20, num.length);

  let mailOptions = {
    from: '"Robert Maulana" <maulana.robert.mr@gmail.com>', // sender address
    to: 'maulana.robert.mr@gmail.com', // list of receivers
    subject: 'Member activation', // Subject line
    text: `<p'>
    Thank you for joining us for Hacktivoverflow, to ensure safety, we have provided a unique link that can be used for validation.
    Please click through the following URL link: http://localhost:3000/user/activation/${uniqueNumber}</p>`, // plain text body
    html: `<p'>
    Thank you for joining us for Hacktivoverflow, to ensure safety, we have provided a unique link that can be used for validation.
    Please click through the following URL link: http://localhost:3000/user/activation/${uniqueNumber}</p>` // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });

  db.User
    .create(
      {username: req.body.username, email: req.body.email, password: num, status_activation: false}
    )
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      res.send(err.message)
    })
}

let userActivation = (req, res) => {
  db.User
    .findOne({where: {password: { $like: `%${req.params.code}%`}}})
    .then((result) => {

      let matchPass = result.password.slice(20, result.password.length)

      if (req.params.code == matchPass) {
        db.User
          .update(
            {status_activation: true},
            {where: {password: { $like: `%${req.params.code}%`}}}
          )
          .then((resultUpdate) => {
            res.send("Your account has been activated!")
          })
          .catch((err) => {
            res.send(err.message)
          })
      }
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
  loginUser, dataUser, createUser, updateUser, deleteUser, userActivation
}
