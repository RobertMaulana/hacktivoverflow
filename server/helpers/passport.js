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
          // console.log(result.status_activation == true);
          if (username == result.username && hash.verify(password, result.password) && (result.status_activation == true)) {
            var token = jwt.sign({ username: result.username }, 'secret', {expiresIn: '1h'});
            let data = {
              token: token,
              username: result.username,
              id: result.id
            }
            next(null, data);
          }else {
            next("You need an activation code from the email url has been sent!")
          }
        }
      })
      .catch((err) => {
        // res.send(err.message)
        console.log(err.message);
      })
  }
));

module.exports = passport.authenticate("local", {session: false});
