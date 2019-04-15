'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('C_DIV', ['name', 'bu_id'], {
      type: 'unique',
      name: 'name-bu_id-composite-unique-constraint',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('C_DIV', 'name-bu_id-composite-unique-constraint', {});
  }
};
