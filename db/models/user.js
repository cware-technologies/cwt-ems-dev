'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('C_USER', {
    row_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    login: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      }
    },
    slt_pwd: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    hash_pwd: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    // password: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   validate: {
    //     is:  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s])(?!.*\s).{8,}/,
    //     notEmpty: true,
    //   }
    // },
    emp_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    resp_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fst_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    created: {
      allowNull: false,
      type: DataTypes.DATE,
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
      type: DataTypes.STRING(200),
    },
    ATTRIB_06: {
      type: DataTypes.STRING(200),
    },
    ATTRIB_07: {
      type: DataTypes.STRING(200),
    },
    ATTRIB_08: {
      type: DataTypes.STRING(200),
    },
    ATTRIB_09: {
      type: DataTypes.STRING(200),
    },
    ATTRIB_10: {
      type: DataTypes.STRING(200),
    },
    ATTRIB_11: {
      type: DataTypes.STRING(200),
    },
    ATTRIB_12: {
      type: DataTypes.STRING(200),
    },
    ATTRIB_13: {
      type: DataTypes.STRING(200),
    },
    ATTRIB_14: {
      type: DataTypes.STRING(200),
    },
    ATTRIB_15: {
      type: DataTypes.STRING(200),
    },
    ATTRIB_16: {
      type: DataTypes.STRING(200),
    },
    ATTRIB_17: {
      type: DataTypes.STRING(200),
    },
    ATTRIB_18: {
      type: DataTypes.STRING(200),
    },
    ATTRIB_19: {
      type: DataTypes.STRING(200),
    },
    ATTRIB_20: {
      type: DataTypes.STRING(200),
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
  }, 
  {
    timestamp: true,
    freezeTableName: true,
    updatedAt: false,
    createdAt: 'created',
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};