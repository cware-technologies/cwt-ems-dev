'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('C_RESP_VIEW', ['bu_id', 'resp_id', 'view_id'], {
      type: 'unique',
      name: 'view_id-resp_id-bu_id-composite-unique-constraint-c_resp_view'
    })
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeConstraint('C_RESP_VIEW', 'c_resp_view_ibfk_1'),
      queryInterface.removeConstraint('C_RESP_VIEW', 'c_resp_view_ibfk_2'),
      queryInterface.removeConstraint('C_RESP_VIEW', 'c_resp_view_ibfk_3'),
    ]).then((pk1, pk2, pk3) => 
      queryInterface.removeConstraint('C_RESP_VIEW', 'view_id-resp_id-bu_id-composite-unique-constraint-c_resp_view', {})
    )
  }
};
