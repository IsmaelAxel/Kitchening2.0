'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('images', 'deleteAt', 'deletedAt');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('images', 'deletedAt', 'deleteAt');
  }
};
