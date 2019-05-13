'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('C_EMP_XM', ['emp_id', 'type', 'name'], {
      type: 'unique',
      name: 'emp_id-type-name-composite-unique-constraint-c_emp_xm',
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('C_EMP_XM', 'emp_id-type-name-composite-unique-constraint-c_emp_xm', {})
  }
};
