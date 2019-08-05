'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('C_BU', {
      row_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(10)
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      desc: {
        type: Sequelize.STRING(100),
        defaultValue: null,
      },
      par_row_id: {
        type: Sequelize.INTEGER(11),
        references: {
          'model': 'C_BU',
          'key': 'row_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
        defaultValue: null,
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
      created: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('C_BU');
  }
};