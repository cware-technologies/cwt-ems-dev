'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('C_LV_REQ', {
      row_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      emp_id: {
        type: Sequelize.INTEGER(11),
        references: {
          'model': 'C_EMP',
          'key': 'row_id',
        },
      },
      strt_dt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      end_dt: {
        type: Sequelize.DATE,
        allowNull: false,    
      },
      stat_cd: {
        type: Sequelize.STRING(30),
        allowNull: false,
        defaultValue: 'pending',
      },
      bu_id: {
        type: Sequelize.INTEGER(11),
        references: {
          'model': 'C_BU',
          'key': 'row_id',
        },
      },
      type_cd: {
        type: Sequelize.INTEGER(11),
        references: {
          'model': 'c_emp',
          'key': 'row_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
        type: Sequelize.STRING(200),
      },
      ATTRIB_05: {
        type: Sequelize.STRING(100),
      },
      ATTRIB_06: {
        type: Sequelize.STRING(100),
      },
      ATTRIB_07: {
        type: Sequelize.STRING(100),
      },
      ATTRIB_08: {
        type: Sequelize.STRING(100),
      },
      ATTRIB_09: {
        type: Sequelize.STRING(100),
      },
      ATTRIB_10: {
        type: Sequelize.STRING(100),
      },
      ATTRIB_11: {
        type: Sequelize.INTEGER(11),
      },
      ATTRIB_12: {
        type: Sequelize.INTEGER(11),
      },
      ATTRIB_13: {
        type: Sequelize.INTEGER(11),
      },
      ATTRIB_14: {
        type: Sequelize.INTEGER(11),
      },
      ATTRIB_15: {
        type: Sequelize.INTEGER(11),
      },
      ATTRIB_16: {
        type: Sequelize.INTEGER(11),
      },
      ATTRIB_17: {
        type: Sequelize.INTEGER(11),
      },
      ATTRIB_18: {
        type: Sequelize.DATE,
      },
      ATTRIB_19: {
        type: Sequelize.DATE,
      },
      ATTRIB_20: {
        type: Sequelize.DATE,
      },
      FLG_01: {
        type: Sequelize.BOOLEAN,
      },
      FLG_02: {
        type: Sequelize.BOOLEAN,
      },
      FLG_03: {
        type: Sequelize.BOOLEAN,
      },
      FLG_04: {
        type: Sequelize.BOOLEAN,
      },
      FLG_05: {
        type: Sequelize.BOOLEAN,
      },
      FLG_06: {
        type: Sequelize.CHAR,
      },
      FLG_07: {
        type: Sequelize.CHAR,
      },
      FLG_08: {
        type: Sequelize.CHAR,
      },
      FLG_09: {
        type: Sequelize.CHAR,
      },
      FLG_10: {
        type: Sequelize.CHAR,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('C_LV_REQ');
  }
};