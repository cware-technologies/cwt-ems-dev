'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('C_EMP', {
      row_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      emp_num: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
        defaultValue: Sequelize.UUIDV4,
      },
      fst_name: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      last_name: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      bu_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        defaultValue: 1,
        references: {
          'model': 'c_bu',
          'key' : 'row_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      div_id: {
        type: Sequelize.INTEGER(11),
        allowNull: true,
        defaultValue: 1,
        references: {
          'model': 'c_div',
          'key' : 'row_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      postn_held_id: {
        type: Sequelize.INTEGER(11),
        allowNull: true,
        defaultValue: null,
        references: {
          'model': 'c_postn',
          'key' : 'row_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      resp_id: {
        type: Sequelize.INTEGER(11),
        allowNull: true,
        defaultValue: null,
        references: {
          'model': 'c_resp',
          'key' : 'row_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      pr_postn_id: {
        type: Sequelize.INTEGER(11),
        allowNull: true,
        defaultValue: null,
        references: {
          'model': 'c_postn',
          'key' : 'row_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      report_to_id: {
        type: Sequelize.INTEGER(11),
        allowNull: true,
        defaultValue: null,
        references: {
          model: 'c_postn',
          key: 'row_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      created: {
        type: Sequelize.DATE,
        allowNull: false,
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
        type: Sequelize.STRING(200),
      },
      ATTRIB_06: {
        type: Sequelize.STRING(100),
      },
      ATTRIB_07: {
        type: Sequelize.STRING(50),
      },
      ATTRIB_08: {
        type: Sequelize.STRING(50),
      },
      ATTRIB_09: {
        type: Sequelize.STRING(50),
      },
      ATTRIB_10: {
        type: Sequelize.STRING(50),
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
        defaultValue: 0,
      },
      FLG_02: {
        type: Sequelize.CHAR,
      },
      FLG_03: {
        type: Sequelize.CHAR,
      },
      FLG_04: {
        type: Sequelize.CHAR,
      },
      FLG_05: {
        type: Sequelize.CHAR,
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
    return queryInterface.dropTable('C_EMP');
  }
};