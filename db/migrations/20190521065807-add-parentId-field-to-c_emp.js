'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('C_EMP', 'parentId', {
      type: Sequelize.INTEGER
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('C_EMP', 'parentId')
  }
};