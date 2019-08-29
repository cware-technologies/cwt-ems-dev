'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('C_NOTIFY', {
    row_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER(11)
    },
    emp_id: {
      type: DataTypes.INTEGER(11),
      
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    stat_cd: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: 'pending',
    },
    bu_id: {
      type: DataTypes.INTEGER(11),

      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    // type_cd: {
    //   type: DataTypes.STRING(200),
    // },
    ATTRIB_01: {
      type: DataTypes.STRING(200),
    },
    ATTRIB_02: {
      type: DataTypes.STRING(200),
    },
    ATTRIB_03: {
      type: DataTypes.STRING(200),
    },
    // ATTRIB_04: {
    //    type: DataTypes.STRING(200),
    //  },
    // ATTRIB_05: {
    //   type: DataTypes.STRING(100),
    // },
    // ATTRIB_06: {
    //   type: DataTypes.STRING(100),
    // },
    // ATTRIB_07: {
    //   type: DataTypes.STRING(100),
    // },
    // ATTRIB_08: {
    //   type: DataTypes.STRING(100),
    // },
    // ATTRIB_09: {
    //   type: DataTypes.STRING(100),
    // },
    // ATTRIB_10: {
    //   type: DataTypes.STRING(100),
    // },
    // ATTRIB_11: {
    //   type: DataTypes.INTEGER(11),
    //     references: {
    //       'model': 'C_LST_VAL',
    //       'key': 'row_id',
    //     },
    //     onUpdate: 'CASCADE',
    //     onDelete: 'CASCADE',
    // },
    // ATTRIB_12: {
    //   type: DataTypes.INTEGER(11),
    // },
    // ATTRIB_13: {
    //   type: DataTypes.INTEGER(11),
    // },
    // ATTRIB_14: {
    //   type: DataTypes.INTEGER(11),
    // },
    // ATTRIB_15: {
    //   type: DataTypes.INTEGER(11),
    // },
    // ATTRIB_16: {
    //   type: DataTypes.INTEGER(11),
    // },
    // ATTRIB_17: {
    //   type: DataTypes.INTEGER(11),
    // },
    // ATTRIB_18: {
    //   type: DataTypes.DATE,
    // },
    // ATTRIB_19: {
    //   type: DataTypes.DATE,
    // },
    // ATTRIB_20: {
    //   type: DataTypes.DATE,
    // },
    // FLG_01: {
    //   type: DataTypes.BOOLEAN,
    // },
    // FLG_02: {
    //   type: DataTypes.BOOLEAN,
    // },
    // FLG_03: {
    //   type: DataTypes.BOOLEAN,
    // },
    // FLG_04: {
    //   type: DataTypes.BOOLEAN,
    // },
    // FLG_05: {
    //   type: DataTypes.BOOLEAN,
    // },
    // FLG_06: {
    //   type: DataTypes.CHAR,
    // },
    // FLG_07: {
    //   type: DataTypes.CHAR,
    // },
    // FLG_08: {
    //   type: DataTypes.CHAR,
    // },
    // FLG_09: {
    //   type: DataTypes.CHAR,
    // },
    // FLG_10: {
    //   type: DataTypes.CHAR,
    // },
  },
  {
    timestamp: true,
    freezeTableName: true,
    updatedAt: false,
    createdAt: 'created',
  });
//   AdminRequest.associate = function(models) {
//     AdminRequest.belongsTo( models.C_EMP, { as: 'requestor', foreignKey: 'emp_id' })
//     AdminRequest.belongsTo( models.C_BU, { as: 'organization', foreignKey: 'bu_id' })
//     AdminRequest.belongsTo( models.C_LST_VAL, { as: 'expenseType', foreignKey: 'ATTRIB_11' })
//   };
  return Notification;
};