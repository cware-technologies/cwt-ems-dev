'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('C_RESP_VIEW', {
      row_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bu_id: {
        type: Sequelize.INTEGER(11),
        allowNull: true,
        defaultValue: 0,
        references: {
          'model': 'c_bu',
          'key': 'row_id',
        },
      },
      view_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        references: {
          'model': 'c_view',
          'key': 'row_id',
        },
      },
      resp_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        references: {
          'model': 'c_resp',
          'key': 'row_id',
        },
      },
      created: {
        allowNull: false,
        type: Sequelize.DATE
      },
      ATTRIB_01: {
        type: Sequelize.STRING(200),
      },
      ATTRIB_02: {
        type: Sequelize.STRING(200),
      },
      ATTRIB_03: {
        type: Sequelize.STRING(200),
      },
      ATTRIB_04: {
        type: Sequelize.INTEGER(11),
      },
      ATTRIB_05: {
        type: Sequelize.INTEGER(11),
      },
      ATTRIB_06: {
        type: Sequelize.INTEGER(11),
      },
      ATTRIB_07: {
        type: Sequelize.DATE,
      },
      FLG_01: {
        type: Sequelize.BOOLEAN,
      },
      FLG_02: {
        type: Sequelize.BOOLEAN,
      },
      FLG_03: {
        type: Sequelize.CHAR,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('C_RESP_VIEW');
  }
};