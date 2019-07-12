'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('C_ORG_NEWS', {
      row_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(10),
      },
      bu_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        defaultValue: 1,
        references: {
          'model': 'c_bu',
          'key': 'row_id',
        }
      },
      stat_cd: {
        type: Sequelize.STRING(30),
        allowNull: false,
        defaultValue: 'active',
      }, 
      type_cd: {
        type: Sequelize.STRING(30), 
        allowNull: false,
      },
      div_id: {
        type: Sequelize.INTEGER(11),
      },
      img_pth: {
        type: Sequelize.STRING(1000),
      },
      ATTRIB_01: {
        type: Sequelize.STRING(1000),
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
        type: Sequelize.STRING(100),
      },
      ATTRIB_08: {
        type: Sequelize.STRING(100),
      },
      ATTRIB_09: {
        type: Sequelize.STRING(100),
      },
      ATTRIB_10: {
        type: Sequelize.STRING(50),
        allowNull: false,
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
        type: Sequelize.CHAR,
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
      created: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('C_ORG_NEWS');
  }
};