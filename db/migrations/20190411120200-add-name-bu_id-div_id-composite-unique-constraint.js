'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('C_POSTN', ['name', 'bu_id', 'div_id'], {
      type: 'unique',
      name: 'name-bu_id-div_id-composite-unique-constraint',
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('C_POSTN', 'name-bu_id-div_id-composite-unique-constraint', {})
  }
};
