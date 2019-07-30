'use strict';

const Op = require('sequelize').Op,
    models = require('../db/models'),
    Employee = models.C_EMP,
    Division = models.C_DIV,
    Position = models.C_POSTN

async function searchEmployee(req, res, next){
    let search = req.query
    let where = search
    console.log(search)

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