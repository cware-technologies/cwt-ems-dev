'use strict';

module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is:  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s])(?!.*\s).{8,}/,
        notEmpty: true,
      }
    },
  }, {timestamp: true,});
  Employee.associate = function(models) {
    // associations can be defined here
  };
  return Employee;
};