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
      "Comments",
      [{
        AnswerId: 1,
        comment: "Setelah saya coba terapkan di project saya kenapa gak berfungsi ya??",
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        AnswerId: 2,
        comment: "Thats works for me!",
        UserId: 1,
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
      "Comments",
      null,
      {}
    )
  }
};
