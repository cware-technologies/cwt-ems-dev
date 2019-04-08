'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrganizationNews = sequelize.define('C_ORG_NEWS', {
    row_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER(10),
    },
    bu_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 1,
    },
    stat_cd: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: 'Active',
    }, 
    type_cd: {
      type: DataTypes.STRING(30), 
      allowNull: false,
    },
    ATTRIB_01: {
      type: DataTypes.STRING(1000),
    },
    ATTRIB_02: {
      type: DataTypes.STRING(200),
    },
    ATTRIB_03: {
      type: DataTypes.STRING(200),
    },
    ATTRIB_04: {
      type: DataTypes.STRING(200),
    },
    ATTRIB_05: {
      type: DataTypes.STRING(200),
    },
    ATTRIB_06: {
      type: DataTypes.STRING(100),
    },
    ATTRIB_07: {
      type: DataTypes.STRING(100),
    },
    ATTRIB_08: {
      type: DataTypes.STRING(100),
    },
    ATTRIB_09: {
      type: DataTypes.STRING(100),
    },
    ATTRIB_10: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    ATTRIB_11: {
      type: DataTypes.INTEGER(11),
    },
    ATTRIB_12: {
      type: DataTypes.INTEGER(11),
    },
    ATTRIB_13: {
      type: DataTypes.INTEGER(11),
    },
    ATTRIB_14: {
      type: DataTypes.INTEGER(11),
    },
    ATTRIB_15: {
      type: DataTypes.INTEGER(11),
    },
    ATTRIB_16: {
      type: DataTypes.INTEGER(11),
    },
    ATTRIB_17: {
      type: DataTypes.INTEGER(11),
    },
    ATTRIB_18: {
      type: DataTypes.DATE,
    },
    ATTRIB_19: {
      type: DataTypes.DATE,
    },
    ATTRIB_20: {
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
    FLG_04: {
      type: DataTypes.CHAR,
    },
    FLG_05: {
      type: DataTypes.CHAR,
    },
    FLG_06: {
      type: DataTypes.CHAR,
    },
    FLG_07: {
      type: DataTypes.CHAR,
    },
    FLG_08: {
      type: DataTypes.CHAR,
    },
    FLG_09: {
      type: DataTypes.CHAR,
    },
    FLG_10: {
      type: DataTypes.CHAR,
    },
    DIV_ID: {
      type: DataTypes.INTEGER(11),
    },
    IMG_PTH: {
      type: DataTypes.STRING(100),
    },
  },
  {
    timestamp: true,
    freezeTableName: true,
    updatedAt: false,
    createdAt: 'created',
  });
  OrganizationNews.associate = function(models) {
    // associations can be defined here
  };
  return OrganizationNews;
};