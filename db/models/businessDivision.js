'use strict';
module.exports = (sequelize, DataTypes) => {
  const businessDivision = sequelize.define('C_DIV', {
    row_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    bu_id: {
      type: DataTypes.INTEGER(10),
      references: {
        'model': 'c_bu',
        'key': 'row_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    par_row_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      references: {
        'model': 'c_div',
        'key': 'row_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    desc: {
      type: DataTypes.STRING(100),
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
      type: DataTypes.INTEGER(10),
    },
    ATTRIB_05: {
      type: DataTypes.INTEGER(10),
    },
    ATTRIB_06: {
      type: DataTypes.INTEGER(10),
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
  businessDivision.associate = function(models) {
    businessDivision.belongsTo(models.C_BU, { as: 'organization', foreignKey: 'bu_id' });
    businessDivision.belongsTo(businessDivision, { as: 'parent', foreignKey: 'par_row_id'});
  };
  return businessDivision;
};