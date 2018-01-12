'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('preferences', 'holding', Sequelize.NUMERIC);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('preferences', 'holding');
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
