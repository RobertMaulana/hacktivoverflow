const passport      = require('passport'),
      passportLocal = require('passport-local'),
      hash          = require('password-hash'),
      jwt           = require('jsonwebtoken'),
      Strategy      = passportLocal.Strategy,
      db            = require('../models');

passport.use(new Strategy(
  (username, password, next) => {
    db.User
      .findOne(
        {where: {username: username}}
      )
      .then((result) => {
        if (result == null) {
          next("Username does not exist!")
        }else {
          if (username == result.username && hash.verify(password, result.password)) {
            // var token = jwt.sign({ username: result.username, role: result.role }, 'secret', {expiresIn: 60 });
            var token = jwt.sign({ username: result.username }, 'secret');
            next(null, {token: token});
          }
        }
      })
      .catch((err) => {
        res.send(err.message)
      })
  }
));

module.exports = passport.authenticate("local", {session: false});
