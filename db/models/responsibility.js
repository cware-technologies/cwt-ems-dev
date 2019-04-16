'use strict';
module.exports = (sequelize, DataTypes) => {
  const Responsibility = sequelize.define('C_RESP', {
    row_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER(11)
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    desc: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    bu_id: {
      type: DataTypes.INTEGER(11),
      unique: true,
      allowNull: false,
      defaultValue: 0,
      references: {
        'model': 'c_bu',
        'key': 'row_id',
      }
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
  Responsibility.associate = function(models) {
    Responsibility.belongsTo( models.C_BU, { as: 'organization', foreignKey: 'bu_id' })
  };
  return Responsibility;
};