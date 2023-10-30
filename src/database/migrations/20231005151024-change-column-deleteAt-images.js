'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Images', 'deleteAt', 'deletedAt');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Images', 'deletedAt', 'deleteAt');
  }
};
