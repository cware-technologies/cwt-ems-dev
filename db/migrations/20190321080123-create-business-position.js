'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('C_POSTN', {
      row_id: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      bu_id: {
        type: Sequelize.INTEGER(10),
        references: {
          'model': 'C_BU',
          'key': 'row_id',  
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      div_id: {
        type: Sequelize.INTEGER(10),
        references: {
          'model': 'C_DIV',
          'key': 'row_id',  
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      desc: {
        type: Sequelize.STRING(100),
      },
      par_row_id: {
        type: Sequelize.INTEGER(11),
        allowNull: true,
        defaultValue: null,
        references: {
          'model': 'C_POSTN',
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
        type: Sequelize.INTEGER(10),
      },
      ATTRIB_05: {
        type: Sequelize.INTEGER(10),
      },
      ATTRIB_06: {
        type: Sequelize.INTEGER(10),
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
    return queryInterface.dropTable('C_POSTN');
  }
};