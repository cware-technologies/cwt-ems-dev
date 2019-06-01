'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
        return queryInterface.addConstraint('C_LV_REQ', ['emp_id', 'strt_dt', 'end_dt', 'type_cd'], {
      type: 'unique',
      name: 'emp_id-dt-type_cd-composite-unique-constraint-c_lv_req',
    })
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeConstraint('C_LV_REQ', 'c_lv_req_ibfk_1'),
      queryInterface.removeConstraint('C_LV_REQ', 'c_lv_req_ibfk_2'),
    ]).then((pk1) =>
      queryInterface.removeConstraint('C_LV_REQ', 'emp_id-dt-type_cd-composite-unique-constraint-c_lv_req', {})
    )
  }
};
