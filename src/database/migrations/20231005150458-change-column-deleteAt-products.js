'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Products', 'deleteAt', 'deletedAt');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Products', 'deletedAt', 'deleteAt');
  }
};
