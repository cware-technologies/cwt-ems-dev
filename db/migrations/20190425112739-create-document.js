'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('C_DOC', {
      row_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      path: {
        type: Sequelize.STRING(400),
        allowNull: false,
      },
      bu_id: {
        type: Sequelize.INTEGER(11),
        references: {
          'model': 'C_BU',
          'key': 'row_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
        type: Sequelize.CHAR,
      },
      FLG_02: {
        type: Sequelize.CHAR,
      },
      FLG_03: {
        type: Sequelize.CHAR,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('C_DOC');
  }
};