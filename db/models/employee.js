'use strict';
const Sequelize = require('sequelize');
const models = require('./index'),
      Organization = models.C_BU,
      Division = models.C_DIV,
      Position = models.C_POSTN,
      Responsibility = models.C_RESP

module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('C_EMP', {
    row_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    emp_num: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    fst_name: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    full_name: {
      type: DataTypes.VIRTUAL,
      get () {
        return this.getDataValue('fst_name') + ' ' + this.getDataValue('last_name')
      }
    },
    bu_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        'model': 'c_bu',
        'key' : 'row_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    div_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        'model': 'c_div',
        'key' : 'row_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    postn_held_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        'model': 'c_postn',
        'key' : 'row_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    resp_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      references: {
        'model': 'c_resp',
        'key' : 'row_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    pr_postn_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      references: {
        'model': 'c_postn',
        'key' : 'row_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    report_to_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      // hierarchy: true,
      references: {
        model: 'c_postn',
        key: 'row_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
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
      type: DataTypes.STRING(200),
    },
    ATTRIB_06: {
      type: DataTypes.STRING(100),
    },
    ATTRIB_07: {
      type: DataTypes.STRING(50),
    },
    ATTRIB_08: {
      type: DataTypes.STRING(50),
    },
    ATTRIB_09: {
      type: DataTypes.STRING(50),
    },
    ATTRIB_10: {
      type: DataTypes.STRING(50),
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
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
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
    // hierarchy: {
    //   // as: 'manager',
    //   // foreignKey: 'report_to_id',
    //   // camelThrough: true,
    // }
  });

  // Employee.isHierarchy({ through: employeeAncestors })
  
  Employee.associate = function(models) {
    Employee.belongsTo( models.C_EMP, { as: 'manager', foreignKey: 'report_to_id' })
    Employee.belongsTo( models.C_BU, { as: 'organization', foreignKey: 'bu_id' })
    Employee.belongsTo( models.C_DIV, { as: 'division', foreignKey: 'div_id' })
    Employee.belongsTo( models.C_POSTN, { as: 'position_held', foreignKey: 'postn_held_id' })
    Employee.belongsTo( models.C_POSTN, { as: 'primary_access_position', foreignKey: 'pr_postn_id' })
    Employee.belongsTo( models.C_RESP, { as: 'responsibility', foreignKey: 'resp_id' })
  };

  Employee.search = async function(query) {
    let search =  query
    let where

    let tableMapping = {
        bu_id: 'C_BU',
        div_id: 'C_DIV',
        postn_held_id: 'C_POSTN',
        resp_id: 'C_RESP',
    }

    console.log(search)

    if(search.id){
      where = {
        row_id: search.id
      }
    }

    else if(search.FLG_01){
      where = {
        FLG_01: {
          [Op.eq]: search.FLG_01 === 'active' ? 1 : 0,
        }
      }
    }

    else if(search.emp_num){
        let tempSQL1 = sequelize.dialect.QueryGenerator.selectQuery('C_EMP', {
          attributes: ['row_id'],
          where: {
              emp_num: {
                  [Op.substring]: search.emp_num,
              }
          }
        }).slice(0,-1)

        where = {
          bu_id: {
            [Op.not]: 1,
          },
          emp_num: {
            [Op.substring]: search.emp_num,
          },
        }
    }
    else if(search.ATTRIB_01){
        where = {
            bu_id: {
              [Op.not]: 1,
            },
            ATTRIB_01: {
              [Op.substring]: search.ATTRIB_01,
            },
        }
    }
    else if(search.name){
        let query = search.name.split(' ')
        where = {
            bu_id: {
              [Op.not]: 1,
            },
            [Op.or]: { 
              fst_name: {
                [Op.substring]: query[0],
              },
              last_name: {
                [Op.substring]: query[1] || query[0],
              },
            }
        }
    }
    else if(Object.keys(search).length > 0){
        let keys = Object.keys(search)
        keys.forEach(key => {
            let tempSQL1 = sequelize.dialect.QueryGenerator.selectQuery(tableMapping[key], {
              attributes: ['row_id'],
              where: {
                name: {
                  [Op.substring]: search[key],
                }
              }
            }).slice(0,-1)

            console.log(tempSQL1, [key])

            where = {
                ...where,
                [key]: {
                  [Op.in]: Sequelize.literal(`(${tempSQL1})`)
                }
            }
        })
        
        where.bu_id = {
          ...where.bu_id,
          [Op.not]: 1,
        }
    }
    console.log(where)

    try{
        let data = await Employee.findAll({
          where,
        })

        return data
      }
      catch(err){
        throw err
      }
  }

  return Employee;
};