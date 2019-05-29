'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('C_RESP', ['name', 'bu_id'], {
      type: 'unique',
      name: 'name-bu_id-composite-unique-constraint-c_resp'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('C_RESP', 'name-bu_id-composite-unique-constraint-c_resp', {});
  }
};
