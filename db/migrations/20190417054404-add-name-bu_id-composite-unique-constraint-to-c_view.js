'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('C_VIEW', ['name', 'bu_id'], {
      type: 'unique',
      name: 'name-bu_id-composite-unique-constraint-c_view',
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('C_VIEW', 'name-bu_id-composite-unique-constraint-c_view', {})
  }
};