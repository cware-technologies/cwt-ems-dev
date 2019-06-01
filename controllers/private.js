
'use strict';

const Op = require('sequelize').Op,
models = require('../db/models'),
Employee = models.C_EMP,
Position = models.C_POSTN,
ProfileAttribute = models.C_EMP_XM,
LeaveRequest = models.C_LV_REQ

async function getEmployee(req, res, next){
    let employee = req.query
    console.log("APPLICATION: ", employee)

    try{
        let data = await Employee.findOne({
            where: {
                row_id: employee.employee,
            },
            include: [
                {
                    model: Position,
                    as: 'position_held',
                    attributes: ['row_id', 'name', 'desc', 'par_row_id']
                },
                {
                    model: Employee,
                    as: 'manager',
                    attributes: ['row_id', 'fst_name', 'last_name']
                },
            ]
        })

        res.status(200).json({
            status: 200,
            result: data,
        })
    }
    catch(err){
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function updateEmployeePersonalDetails(req, res, next){
    let details = req.body

    try{
        let data = await Employee.update(details.details, { where: {row_id: details.details.row_id }})

        res.status(200).json({
            status: 200,
            data,
        })
    }
    catch(err){
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function searchEmployeeDetails(req, res, next){
    let employee = req.query
    console.log("APPLICATION: ", employee)

    try{
        let data = await ProfileAttribute.findAll({
            where: {
                emp_id: employee.employee,
                [Op.or]: [
                    {type: 'contact_details'},
                    {type: 'other_details'},
                ]
            }
        })

        res.status(200).json({
            status: 200,
            result: data,
        })
    }
    catch(err){
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function upsertEmployeeDetail(record){
    return new Promise(async (resolve, reject) => {
        try{
            let data = await ProfileAttribute.upsert(record, { returning: true, })
            console.log(data)
            resolve(data)
        }
        catch(err){
            reject(err)
        }
    })    
}

async function upsertEmployeeDetails(req, res, next){
    let Details = req.body
    console.log("Record: ", Details)

    Promise.all(Details.records.map(record => upsertEmployeeDetail(record)))
    .then(results => 
        res.status(200).json({
            status: 200,
            result: results,
        })
    )
    .catch(err => {
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    })
}

async function searchEmployeeCertifications(req, res, next){
    let employee = req.query
    console.log("APPLICATION: ", employee)

    try{
        let data = await ProfileAttribute.findAll({
            where: {
                emp_id: employee.employee,
                type: 'certification_details'
            }
        })

        res.status(200).json({
            status: 200,
            result: data,
        })
    }
    catch(err){
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function addEmployeeCertification(req, res, next){
    let certificate = req.body
    console.log("APPLICATION: ", certificate)

    try{
        let data = await ProfileAttribute.create({
            ...certificate,
            type: 'certification_details',
        })

        res.status(200).json({
            status: 200,
            data,
        })
    }
    catch(err){
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function deleteEmployeeCertification(req, res, next){
    let certificate = req.body
    console.log("APPLICATION: ", certificate)

    try{
        let data = await ProfileAttribute.destroy({
            where: {
                row_id: certificate.row_id
            }
        })

        res.status(200).json({
            status: 200,
            data,
        })
    }
    catch(err){
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function updateEmployeeCertification(req, res, next){
    let certificate = req.body
    console.log("APPLICATION: ", certificate)

    try{
        let data = await ProfileAttribute.update(certificate, { where: {row_id: certificate.row_id }})

        res.status(200).json({
            status: 200,
            data,
        })
    }
    catch(err){
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function searchEmployeeSkills(req, res, next){
    let employee = req.query
    console.log("APPLICATION: ", employee)

    try{
        let data = await ProfileAttribute.findAll({
            where: {
                emp_id: employee.employee,
                type: 'skill_details'
            }
        })

        res.status(200).json({
            status: 200,
            result: data,
        })
    }
    catch(err){
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function addEmployeeSkill(req, res, next){
    let certificate = req.body
    console.log("APPLICATION: ", certificate)

    try{
        let data = await ProfileAttribute.create({
            ...certificate,
            type: 'skill_details',
        })

        res.status(200).json({
            status: 200,
            data,
        })
    }
    catch(err){
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function deleteEmployeeSkill(req, res, next){
    let certificate = req.body
    console.log("APPLICATION: ", certificate)

    try{
        let data = await ProfileAttribute.destroy({
            where: {
                row_id: certificate.row_id
            }
        })

        res.status(200).json({
            status: 200,
            data,
        })
    }
    catch(err){
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function updateEmployeeSkill(req, res, next){
    let certificate = req.body
    console.log("APPLICATION: ", certificate)

    try{
        let data = await ProfileAttribute.update(certificate, { where: {row_id: certificate.row_id }})

        res.status(200).json({
            status: 200,
            data,
        })
    }
    catch(err){
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function searchEmployeeProfessionalAttributes(req, res, next){
    let employee = req.query
    console.log("APPLICATION: ", employee)

    try{
        let data = await ProfileAttribute.findAll({
            where: {
                emp_id: employee.employee,
                type: 'profAttrib_details'
            }
        })

        res.status(200).json({
            status: 200,
            result: data,
        })
    }
    catch(err){
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function addEmployeeProfessionalAttribute(req, res, next){
    let certificate = req.body
    console.log("APPLICATION: ", certificate)

    try{
        let data = await ProfileAttribute.create({
            ...certificate,
            type: 'profAttrib_details',
        })

        res.status(200).json({
            status: 200,
            data,
        })
    }
    catch(err){
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function deleteEmployeeProfessionalAttribute(req, res, next){
    let certificate = req.body
    console.log("APPLICATION: ", certificate)

    try{
        let data = await ProfileAttribute.destroy({
            where: {
                row_id: certificate.row_id
            }
        })

        res.status(200).json({
            status: 200,
            data,
        })
    }
    catch(err){
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function updateEmployeeProfessionalAttribute(req, res, next){
    let certificate = req.body
    console.log("APPLICATION: ", certificate)

    try{
        let data = await ProfileAttribute.update(certificate, { where: {row_id: certificate.row_id }})

        res.status(200).json({
            status: 200,
            data,
        })
    }
    catch(err){
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function getLeaves(req, res, next){
    let params = req.query

    try{
        let data = await LeaveRequest.findAll({
            where: {
                emp_id: params.employee,
            }
        })

        res.status(200).json({
            status: 200,
            data,
        })
    }
    catch(err){
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function applyForLeave(req, res, next){

}

module.exports = {
    getEmployee,
    updateEmployeePersonalDetails,
    searchEmployeeDetails,
    upsertEmployeeDetail,
    upsertEmployeeDetails,
    searchEmployeeCertifications,
    addEmployeeCertification,
    deleteEmployeeCertification,
    updateEmployeeCertification,
    searchEmployeeSkills,
    addEmployeeSkill,
    deleteEmployeeSkill,
    updateEmployeeSkill,
    searchEmployeeProfessionalAttributes,
    addEmployeeProfessionalAttribute,
    deleteEmployeeProfessionalAttribute,
    updateEmployeeProfessionalAttribute,
    getLeaves,
    applyForLeave,
}