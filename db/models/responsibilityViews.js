'use strict';
module.exports = (sequelize, DataTypes) => {
  const ResponsibilityViews = sequelize.define('C_RESP_VIEW', {
    row_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    bu_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: 0,
      references: {
        'model': 'c_bu',
        'key': 'row_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    view_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        'model': 'c_view',
        'key': 'row_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    resp_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        'model': 'c_resp',
        'key': 'row_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
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
      type: DataTypes.BOOLEAN,
    },
    FLG_02: {
      type: DataTypes.BOOLEAN,
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
  ResponsibilityViews.associate = function(models) {
    ResponsibilityViews.belongsTo( models.C_VIEW, { as: 'view', foreignKey: 'view_id' } )
    ResponsibilityViews.belongsTo( models.C_RESP, { as: 'responsibility', foreignKey: 'resp_id' } )
  };
  return ResponsibilityViews;
};