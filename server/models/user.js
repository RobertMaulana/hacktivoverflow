'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.TEXT,
    password: DataTypes.STRING,
    status_activation: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.hasMany(models.Question)
      }
    }
  });
  return User;
};
