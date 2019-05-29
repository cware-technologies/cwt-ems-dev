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
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      references: {
        'model': 'c_emp',
        'key': 'row_id',
      }
    },
    resp_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          'model': 'c_resp',
          'key': 'row_id'
        }
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
    bu_id: {
      type: DataTypes.INTEGER(11),
        allowNull: true,
        defaultValue: null,
        references: {
          model: 'c_bu',
          key: 'row_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    div_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        defaultValue: null,
        references: {
          model: 'c_div',
          key: 'row_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
    User.belongsTo(models.C_EMP, { as: 'employee', foreignKey: 'emp_id' })
    User.belongsTo(models.C_BU, { as: 'organization', foreignKey: 'bu_id' })
    User.belongsTo(models.C_DIV, { as: 'division', foreignKey: 'div_id' })
  };
  return User;
};