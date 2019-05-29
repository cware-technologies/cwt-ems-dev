'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('C_EMP_XM', ['emp_id', 'type', 'name'], {
      type: 'unique',
      name: 'emp_id-type-name-composite-unique-constraint-c_emp_xm',
    })
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeConstraint('C_EMP_XM', 'c_emp_xm_ibfk_1'),
    ]).then((pk1) =>
      queryInterface.removeConstraint('C_EMP_XM', 'emp_id-type-name-composite-unique-constraint-c_emp_xm', {})
    )
  }
};
