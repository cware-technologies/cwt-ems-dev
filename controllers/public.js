'use strict';

const Op = require('sequelize').Op,
    models = require('../db/models'),
    Employee = models.C_EMP,
    Division = models.C_DIV,
    Position = models.C_POSTN,
    Sequelize = require('sequelize'),
    sequelize = require('../db/models').sequelize

async function searchEmployee(req, res, next){
    let search = req.query
    let where = search
    console.log(search)

    let tableMapping = {
        bu_id: 'C_BU',
        div_id: 'C_DIV',
        postn_held_id: 'C_POSTN',
        resp_id: 'C_RESP',
    }

    if(search.name){
        let query = search.name.split(' ')

        where = {
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
    else if(search.ATTRIB_01){
        where = {
            ATTRIB_01: {
                [Op.substring]: search.ATTRIB_01,
            },
        }
    }
    else if(search.emp_num){
        where = {
            emp_num: {
                [Op.substring]: search.emp_num,
            },
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

    try{
        let data = await Employee.findAll({
            where,
            include: [
                {
                    model: Division,
                    as: 'division',
                    attributes: ['row_id', 'name', 'desc', 'par_row_id']
                },
                {
                    model: Position,
                    as: 'position_held',
                    attributes: ['row_id', 'name', 'desc', 'par_row_id']
                },
                {
                    model: Position,
                    as: 'manager',
                    attributes: ['row_id', 'name']
                },
            ]
        })

        res.status(200).json({
            status: 200,
            result: data,
        })
    }
    catch(err){
        err.status = 404
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function expandHierarchy(root){
    function expand(root){
        root && root.getManager().then(manager => {
            if(!manager){
                console.log("NULLL")
                // console.log("CHAIN: ", reportingChain)
                return
            }
            
            else{
                console.log(manager.get({plain: true}).full_name)
                reportingChain.push(manager.get({plain: true}))
                return expand(manager)
                console.log("BACK")
            }
        })
    }

    let reportingChain = []
    // console.log(root)
    try{
        await expand(root)

        console.log("CHAIN: ", reportingChain)
        return reportingChain
    }
    catch(err){

    }
    
    
    
    

    
}

async function getEmployeeHierarchy(req, res, next){
    // const data = await Employee.findOne({
    //     where: { row_id: req.query.employee },
    //     include: {
    //       model: Employee,
    //       as: 'manager',
    //       hierarchy: true
    //     }
    //   });
    try{
        const data = await Employee.findOne({
            where: {
                row_id: req.query.employee,
            }
        });
    
        let hierarchy = await expandHierarchy(data)
    
        res.json({
            data: hierarchy,
        })
    }
    catch(err){

    }
}

module.exports = {
    searchEmployee,
    getEmployeeHierarchy,
}