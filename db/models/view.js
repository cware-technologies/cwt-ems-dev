'use strict';
module.exports = (sequelize, DataTypes) => {
  const View = sequelize.define('C_VIEW', {
    row_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    desc: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null,
    },
    bu_id: {
      type: DataTypes.INTEGER(11),
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
  View.associate = function(models) {
    View.belongsTo( models.C_BU, { as: 'organization', foreignKey: 'bu_id' } )
    View.belongsToMany( models.C_RESP, { as: 'responsibility', through: models.C_RESP_VIEW, foreignKey: 'view_id' } )
  };
  return View;
};