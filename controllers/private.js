
'use strict';

const Op = require('sequelize').Op,
    models = require('../db/models'),
    Employee = models.C_EMP,
    Position = models.C_POSTN,
    ProfileAttribute = models.C_EMP_XM,
    ListValues = models.C_LST_VAL,
    LeaveRequest = models.C_LV_REQ,
    Sequelize = require('sequelize'),
    sequelize = require('../db/models').sequelize

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

async function getEmployeeEntitlements(req, res, next){
    let params = req.query

    try{
        let data = await ProfileAttribute.findAll({
            where: {
                emp_id: params.emp_id,
                type: 'leave_type',
            },
            include: [
                {
                    model: ListValues,
                    as: 'function',
                }
            ]
        }).map(ele => ele.get({plain: true}).function)

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

async function getContracts(req, res, next){
    let employee = req.query
    console.log("APPLICATION: ", employee)

    try{
        let data = await ProfileAttribute.findAll({
            where: {
                emp_id: employee.employee,
                type: 'contract',
                ATTRIB_02: 'pending',
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

async function acceptContract(req, res, next){
    let contract = req.query
    console.log("APPLICATION: ", contract)

    try{
        let data = await ProfileAttribute.update(
        {
            ATTRIB_02: 'accepted',
        },
        {
            where: {
                row_id: contract.contract_id,
                type: 'contract',
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

async function rejectContract(req, res, next){
    let contract = req.query
    console.log("APPLICATION: ", contract)

    try{
        let data = await ProfileAttribute.update(
        {
            ATTRIB_02: 'rejected',
        },
        {
            where: {
                row_id: contract.contract_id,
                type: 'contract',
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

async function getLeaves(req, res, next){
    let params = req.query

    try{
        let data = await LeaveRequest.findAll({
            where: {
                emp_id: params.emp_id,
            },
            include: [
                {
                    model: ListValues,
                    as: 'entitlement',
                },
            ]
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

async function getEntitlementsData(req, res, next){
    let params = req.query

    try{
        let data = await ProfileAttribute.findAll({
            where: {
                emp_id: params.emp_id,
                type: 'leave_type',
            },
            include: [
                {
                    model: ListValues,
                    as: 'function',
                }
            ]
        }).map(ele => ele.get({plain: true}).function)
        
        // let tempSQL1 = sequelize.dialect.QueryGenerator.selectQuery('C_LV_REQ', {
        //     attributes: ['stat_cd'/* [Sequelize.fn('SUM', sequelize.col('c_lv_req.ATTRIB_11')), 'temp'] */],
        // }).slice(0,-1)

        // tempSQL1 = Sequelize.literal(`(${tempSQL1})`)

        sequelize.query(
            `
                SELECT SUM(clr.ATTRIB_11) AS no_days, (clv.ATTRIB_11 - SUM(clr.ATTRIB_11)) AS remaining, clv.val, clv.ATTRIB_11
                FROM C_LV_REQ clr, C_LST_VAL clv
                WHERE clr.type_cd = clv.row_id AND clr.emp_id = ${params.emp_id}
                GROUP BY clr.type_cd
            `,
            {
                type: sequelize.QueryTypes.SELECT
            }
        ).then(result => res.status(200).json({
            status: 200,
            data: result,
        }))
        // let data2 = await LeaveRequest.findAll({
        //     where: {
        //         emp_id: params.emp_id,
        //     },
        //     include: [
        //         {
        //             model: ListValues,
        //             as: 'entitlement',
        //             // attributes: ['row_id', 'val', 'ATTRIB_11']
        //         },
        //     ],
        //     group: ['type_cd'],
        //     attributes: [
        //         [Sequelize.fn('SUM', sequelize.col('c_lv_req.ATTRIB_11')), 'no_days'],
        //         // Sequelize.literal(`${tempSQL1}`),
        //     ],
        // })

        // console.log(data)

        // res.status(200).json({
        //     status: 200,
        //     data: data2,
        // })
    }
    catch(err){
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function postLeaveRequest(req, res, next){
    let leave = req.body
    console.log("APPLICATION: ", leave)
    console.log(leave['type_cd.value'])

    try{
        let data = await LeaveRequest.create({
            ...leave,
            type_cd: leave['type_cd.value'],
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

async function withdrawLeave(req, res, next) {
    let entity = req.body

    try {
        let data = await LeaveRequest.destroy(
            {
                where:
                {
                    row_id: entity.row_id
                }
            }
        )

        res.status(200).json({
            status: 200,
            data,
        })
    }
    catch (err) {
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}


async function getRequestedLeaves(req, res, next) {
    let params = req.query

    try {
        let data = await Employee.findAll({
            where: {
                report_to_id: params.emp_id,
            },
            attributes: ["row_id"]
        }).map(ele => ele.get({ plain: true }).row_id)


        try {
            let data2 = await LeaveRequest.findAll({
                where: {
                    emp_id: {
                        [Op.in]: data,
                    },
                    stat_cd: "pending"
                },
                include: [
                    {
                        model: Employee,
                        as: "requestor",
                        attributes: [
                            "fst_name",
                            "last_name"

                        ]
                    }
                ],

            })

            res.status(200).json({
                status: 200,
                data: data2,
            })
        }
        catch (err) {

        }


    }
    catch (err) {
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function updateLeaveRequested(req, res, next) {
    let details = req.body

    try {
        let data = await LeaveRequest.update(
            {
                stat_cd: details.stat_cd
            },
            {
                where:
                {
                    row_id: details.row_id
                }
            })

        res.status(200).json({
            status: 200,
            data,
        })
    }
    catch (err) {
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }

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
    getEmployeeEntitlements,
    getLeaves,
    getEntitlementsData,
    postLeaveRequest,
    withdrawLeave,
    getRequestedLeaves,
    updateLeaveRequested,
    applyForLeave,
    getContracts,
    acceptContract,
    rejectContract,
}