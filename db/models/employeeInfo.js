'use strict';
module.exports = (sequelize, DataTypes) => {
  const EmployeeInfo = sequelize.define('C_EMP', {
    row_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER(10),
    },
    employee_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'c_user',
        key: 'id'
      },
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    father_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cnic: {
      type: DataTypes.INTEGER(14).UNSIGNED.ZEROFILL,
      unique: true,
      allowNull: false,
      validate: {
        isInt: true,
      }
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    religion: {
      type: DataTypes.STRING,
      allowNull: true,
      isIn: [['islam', 'chritianity', 'hindu', 'jew', 'buddhist']],
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    account_no: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isAlphanumeric: true,
      }
    },
    cellphone_no: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isNumeric: true,
      }
    },
    landline_no: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isNumeric: true,
      }
    },
    postal_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    permanent_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {});
  EmployeeInfo.associate = function(models) {
    EmployeeInfo.belongsTo(models.C_USER);
  };
  return EmployeeInfo;
};