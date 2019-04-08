'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'C_USER',
      'DIV_ID',
      {
        type: Sequelize.INTEGER(11),
        allowNull: true,
        defaultValue: null,
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'C_USER',
      'DIV_ID'
    )
  }
};
