'use strict';
module.exports = (sequelize, DataTypes) => {
  const ListOfValues = sequelize.define('C_LST_VAL', {
    row_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER(11),
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    bu_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        'model': 'C_BU',
        'key': 'row_id',
      },
    },
    val: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    created: {
      allowNull: false,
      type: DataTypes.DATE
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
      type: DataTypes.STRING(200),
    },
    ATTRIB_05: {
      type: DataTypes.STRING(100),
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
      type: DataTypes.STRING(100),
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
    ATTRIB_21: {
      type: DataTypes.STRING(50),
    },
    ATTRIB_22: {
      type: DataTypes.STRING(50),
    },
    ATTRIB_23: {
      type: DataTypes.STRING(50),
    },
    ATTRIB_24: {
      type: DataTypes.STRING(50),
    },
    ATTRIB_25: {
      type: DataTypes.STRING(50),
    },
    FLG_01: {
      type: DataTypes.BOOLEAN,
    },
    FLG_02: {
      type: DataTypes.BOOLEAN,
    },
    FLG_03: {
      type: DataTypes.BOOLEAN,
    },
    FLG_04: {
      type: DataTypes.BOOLEAN,
    },
    FLG_05: {
      type: DataTypes.BOOLEAN,
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
  },
  {
    timestamp: true,
    freezeTableName: true,
    updatedAt: false,
    createdAt: 'created',
  });
  ListOfValues.associate = function(models) {
    ListOfValues.belongsTo( models.C_BU, { as: 'organization', foreignKey: 'bu_id' })
  };
  return ListOfValues;
};