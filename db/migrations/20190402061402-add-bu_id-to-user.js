'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'C_USER',
      'bu_id',
      {
        type: Sequelize.INTEGER(11),
        allowNull: true,
        defaultValue: null,
        references: {
          model: 'c_bu',
          key: 'row_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'C_USER',
      'bu_id'
    )
  }
};
