'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('C_EMP', 'hierarchyLevel', {
      type: Sequelize.INTEGER,
    },
    {
      after: 'report_to_id'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('C_EMP', 'hierarchyLevel')
  }
};
