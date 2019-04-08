'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('C_USER', {
      row_id: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      login: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: true,
        }
      },
      slt_pwd: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      hash_pwd: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      // password: {
      //   type: Sequelize.STRING,
      //   allowNull: false,
      //   validate: {
      //     is:  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s])(?!.*\s).{8,}/,
      //     notEmpty: true,
      //   }
      // },
      emp_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      resp_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      fst_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
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
        type: Sequelize.STRING(200),
      },
      ATTRIB_06: {
        type: Sequelize.STRING(200),
      },
      ATTRIB_07: {
        type: Sequelize.STRING(200),
      },
      ATTRIB_08: {
        type: Sequelize.STRING(200),
      },
      ATTRIB_09: {
        type: Sequelize.STRING(200),
      },
      ATTRIB_10: {
        type: Sequelize.STRING(200),
      },
      ATTRIB_11: {
        type: Sequelize.STRING(200),
      },
      ATTRIB_12: {
        type: Sequelize.STRING(200),
      },
      ATTRIB_13: {
        type: Sequelize.STRING(200),
      },
      ATTRIB_14: {
        type: Sequelize.STRING(200),
      },
      ATTRIB_15: {
        type: Sequelize.STRING(200),
      },
      ATTRIB_16: {
        type: Sequelize.STRING(200),
      },
      ATTRIB_17: {
        type: Sequelize.STRING(200),
      },
      ATTRIB_18: {
        type: Sequelize.STRING(200),
      },
      ATTRIB_19: {
        type: Sequelize.STRING(200),
      },
      ATTRIB_20: {
        type: Sequelize.STRING(200),
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('C_USER');
  }
};