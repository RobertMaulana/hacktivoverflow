'use strict';
module.exports = function(sequelize, DataTypes) {
  var Question = sequelize.define('Question', {
    UserId: DataTypes.INTEGER,
    title_question: DataTypes.STRING,
    question: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Question.belongsTo(models.User)
        Question.hasMany(models.Answer)
      }
    }
  });
  return Question;
};
