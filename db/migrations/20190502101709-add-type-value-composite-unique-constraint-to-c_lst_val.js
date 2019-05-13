'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('C_LST_VAL', ['type', 'val'], {
      type: 'unique',
      name: 'type-value-composite-unique-constraint-c_lst_val'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('C_LST_VAL', 'type-value-composite-unique-constraint-c_lst_val', {})
  }
};