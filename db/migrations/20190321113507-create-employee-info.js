'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('EmployeeInfo', {
      employee_id: {
        type: Sequelize.INTEGER,
        references: {
          'model': 'Employees',
          'key': 'id',  
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      father_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cnic: {
        type: Sequelize.INTEGER(14).UNSIGNED.ZEROFILL,
        unique: true,
        allowNull: false,
        validate: {
          isInt: true,
        }
      },
      dob: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      religion: {
        type: Sequelize.STRING,
        allowNull: true,
        isIn: [['islam', 'chritianity', 'hindu', 'jew', 'buddhist']],
      },
      designation: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      account_no: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          isAlphanumeric: true,
        }
      },
      cellphone_no: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          isNumeric: true,
        }
      },
      landline_no: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          isNumeric: true,
        }
      },
      postal_address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      permanent_address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('EmployeeInfo');
  }
};