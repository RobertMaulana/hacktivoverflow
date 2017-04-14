'use strict';
module.exports = function(sequelize, DataTypes) {
  var Answer = sequelize.define('Answer', {
    QuestionId: DataTypes.INTEGER,
    answer: DataTypes.TEXT,
    vote: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Answer.belongsTo(models.Question)
        Answer.hasMany(models.Comment)
      }
    }
  });
  return Answer;
};
