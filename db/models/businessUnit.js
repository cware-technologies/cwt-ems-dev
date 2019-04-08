'use strict';
module.exports = (sequelize, DataTypes) => {
  const BusinessUnit = sequelize.define('C_BU', {
    row_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER(10),
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    desc: {
      type: DataTypes.STRING(100),
      defaultValue: null,
    },
    par_row_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
    },
    ATTRIB_01: {
      type: DataTypes.STRING(200),
    },
    ATTRIB_02: {
      type: DataTypes.STRING(200),
    },
    ATTRIB_03: {
      type: DataTypes.STRING(200),
    },
    ATTRIB_04: {
      type: DataTypes.INTEGER(11),
    },
    ATTRIB_05: {
      type: DataTypes.INTEGER(11),
    },
    ATTRIB_06: {
      type: DataTypes.INTEGER(11),
    },
    ATTRIB_07: {
      type: DataTypes.DATE,
    },
    FLG_01: {
      type: DataTypes.CHAR,
    },
    FLG_02: {
      type: DataTypes.CHAR,
    },
    FLG_03: {
      type: DataTypes.CHAR,
    },
  },
  {
    timestamp: true,
    freezeTableName: true,
    updatedAt: false,
    createdAt: 'created',
  });
  BusinessUnit.associate = function(models) {
    // associations can be defined here
  };
  return BusinessUnit;
};