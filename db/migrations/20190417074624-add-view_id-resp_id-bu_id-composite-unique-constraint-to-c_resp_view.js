'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('C_RESP_VIEW', ['bu_id', 'resp_id', 'view_id'], {
      type: 'unique',
      name: 'view_id-resp_id-bu_id-composite-unique-constraint-c_resp_view'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('C_RESP_VIEW', 'view_id-resp_id-bu_id-composite-unique-constraint-c_resp_view', {})
  }
};
