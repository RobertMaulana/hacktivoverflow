'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert(
      "Questions",
      [{
        UserId: 1,
        title_question: "How to declare component data vue in child",
        question: "blablablablabla",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        UserId: 1,
        title_question: "How to use bootstrap",
        question: "sadasddfsadas",
        createdAt: new Date(),
        updatedAt: new Date()
      }]
    )
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete(
      "Questions",
      null,
      {}
    )
  }
};
