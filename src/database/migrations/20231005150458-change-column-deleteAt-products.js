'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('products', 'deleteAt', 'deletedAt');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('products', 'deletedAt', 'deleteAt');
  }
};
