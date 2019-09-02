
'use strict';

const Op = require('sequelize').Op,
    models = require('../db/models'),
    User = models.C_USER,
    Employee = models.C_EMP,
    Organization = models.C_BU,
    Position = models.C_POSTN,
    ProfileAttribute = models.C_EMP_XM,
    ListValues = models.C_LST_VAL,
    LeaveRequest = models.C_LV_REQ,
    AdminRequest = models.C_ADM_REQ,
    Notification = models.C_NOTIFY,
    Sequelize = require('sequelize'),
    sequelize = require('../db/models').sequelize,
    multer = require('multer')

let fileName = null

function fileNameSet(name) {
    fileName = name
}

async function getEmployee(req, res, next) {
    let employee = req.query
    console.log("APPLICATION: ", employee)

    try {
        let data = await User.findOne({
            where: {
                row_id: employee.employee,
            },
        })

        let emp = await data.getEmployee({
            include: [
                {
                    model: Organization,
                    as: 'organization',
                    attributes: ['row_id', 'name', 'desc', 'par_row_id']                    
                },
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
            result: emp,
        })
    }
    catch (err) {
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function updateEmployeePersonalDetails(req, res, next) {
    let details = req.body

    try {
        let data = await Employee.update(details.details, { where: { row_id: details.details.row_id } })

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

async function searchEmployeeDetails(req, res, next) {
    let employee = req.query
    console.log("APPLICATION: ", employee)

    try {
        let data = await ProfileAttribute.findAll({
            where: {
                emp_id: employee.employee,
                [Op.or]: [
                    { type: 'contact_details' },
                    { type: 'other_details' },
                ]
            }
        })

        res.status(200).json({
            status: 200,
            result: data,
        })
    }
    catch (err) {
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function upsertEmployeeDetail(record) {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await ProfileAttribute.upsert(record, { returning: true, })
            console.log(data)
            resolve(data)
        }
        catch (err) {
            reject(err)
        }
    })
}

async function upsertEmployeeDetails(req, res, next) {
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

async function searchEmployeeCertifications(req, res, next) {
    let employee = req.query
    console.log("APPLICATION: ", employee)

    try {
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
    catch (err) {
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function addEmployeeCertification(req, res, next) {
    let certificate = req.body
    console.log("APPLICATION: ", certificate)

    try {
        let data = await ProfileAttribute.create({
            ...certificate,
            type: 'certification_details',
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

async function deleteEmployeeCertification(req, res, next) {
    let certificate = req.body
    console.log("APPLICATION: ", certificate)

    try {
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
    catch (err) {
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function updateEmployeeCertification(req, res, next) {
    let certificate = req.body
    console.log("APPLICATION: ", certificate)

    try {
        let data = await ProfileAttribute.update(certificate, { where: { row_id: certificate.row_id } })

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

async function searchEmployeeSkills(req, res, next) {
    let employee = req.query
    console.log("APPLICATION: ", employee)

    try {
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
    catch (err) {
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function addEmployeeSkill(req, res, next) {
    let certificate = req.body
    console.log("APPLICATION: ", certificate)

    try {
        let data = await ProfileAttribute.create({
            ...certificate,
            type: 'skill_details',
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

async function deleteEmployeeSkill(req, res, next) {
    let certificate = req.body
    console.log("APPLICATION: ", certificate)

    try {
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
    catch (err) {
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function updateEmployeeSkill(req, res, next) {
    let certificate = req.body
    console.log("APPLICATION: ", certificate)

    try {
        let data = await ProfileAttribute.update(certificate, { where: { row_id: certificate.row_id } })

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

async function searchEmployeeProfessionalAttributes(req, res, next) {
    let employee = req.query
    console.log("APPLICATION: ", employee)

    try {
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
    catch (err) {
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function addEmployeeProfessionalAttribute(req, res, next) {
    let certificate = req.body
    console.log("APPLICATION: ", certificate)

    try {
        let data = await ProfileAttribute.create({
            ...certificate,
            type: 'profAttrib_details',
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

async function deleteEmployeeProfessionalAttribute(req, res, next) {
    let certificate = req.body
    console.log("APPLICATION: ", certificate)

    try {
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
    catch (err) {
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function updateEmployeeProfessionalAttribute(req, res, next) {
    let certificate = req.body
    console.log("APPLICATION: ", certificate)

    try {
        let data = await ProfileAttribute.update(certificate, { where: { row_id: certificate.row_id } })

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

async function getEmployeeEntitlements(req, res, next) {
    let params = req.query
	console.log("PARAMS:" , params)
    try {
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
        }).map(ele => ele.get({ plain: true }).function)

        res.status(200).json({
            status: 200,
            result: data,
        })
    }
    catch (err) {
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function getLeaves(req, res, next) {
    let params = req.query

    try {
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
    catch (err) {
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function applyForLeave(req, res, next) {

}

async function getContracts(req, res, next) {
    let employee = req.query
    console.log("APPLICATION: ", employee)

    try {
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
    catch (err) {
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function acceptContract(req, res, next) {
    let contract = req.query
    console.log("APPLICATION: ", contract)

    sequelize.transaction(t => {
        return ProfileAttribute.update(
            {
                ATTRIB_02: 'accepted',
            },
            {
                where: {
                    row_id: contract.contract_id,
                    type: 'contract',
                },
                transaction: t,
            }
        ).then(res => 
            Employee.update(
                {
                    ATTRIB_18: sequelize.col('ATTRIB_19'),
                    ATTRIB_19: sequelize.fn('adddate', sequelize.col('ATTRIB_19'), sequelize.literal('INTERVAL 1 YEAR')),
                },
                {
                    where: {
                        row_id: contract.employee,
                    },
                    transaction: t,
                }
            )            
        )
    })
    .then(data =>
        res.status(200).json({
            status: 200,
            result: data,
        })
    )
    .catch(err => {
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    })
}

async function rejectContract(req, res, next) {
    let contract = req.query
    console.log("APPLICATION: ", contract)

    try {
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
    catch (err) {
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function getLeaves(req, res, next) {
    let params = req.query

    try {
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
    catch (err) {
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function getEntitlementsData(req, res, next) {
    let params = req.query

    try {
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
        }).map(ele => ele.get({ plain: true }).function)

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
    }
    catch (err) {
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function postLeaveRequest(req, res, next) {
    let leave = req.body
    console.log("APPLICATION: ", leave)
    console.log(leave['type_cd.value'])

    try {
        let data = await LeaveRequest.create({
            ...leave,
            type_cd: leave['type_cd.value'],
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

async function getLeaves(req, res, next) {
    let params = req.query

    try {
        let data = await LeaveRequest.findAll({
            where: {
                emp_id: params.emp_id,
            },
            include: [
                {
                    model: ListValues,
                    as: "entitlement",
                }
            ]
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
                    //stat_cd: "pending"
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

async function getLeavesCount(req, res, next) {
    let details = req.query

    try {
        let data2 = await LeaveRequest.findOne(
            {
                raw: true,
                attributes: [[sequelize.fn('sum', sequelize.col('ATTRIB_11')), 'daysUtilised']],
                where:
                {
                    emp_id: details.emp_id,
                    type_cd: details.type_cd,
                    stat_cd: 'accepted'
                }
            })

        let ddd = parseInt(data2.daysUtilised)

        try {
            let data = await ListValues.findOne(
                {
                    where:
                    {
                        bu_id: details.bu_id,
                        row_id: details.type_cd
                    }
                })

            let sum = ddd + parseInt(details.days)
            let remaining = false

            if (sum < data.ATTRIB_11) {
                remaining = true
            }

            res.status(200).json({
                status: 200,
                isRemaining: remaining,
                ddd,
                sum,
                alloted: data.ATTRIB_11
            })
        }
        catch (err) {
            err.status = 400
            err.message = `Database Error: ${err}`
            next(err)
        }
    }
    catch (err) {
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function postTicketRequest(req, res, next) {
    let request = req.body
    console.log("FFFFFFFIIIIIILLLLLEEEE   ", request.fileName)
    if (request.fileName === null) {
        fileName = null
    }
    try {
        let data = await AdminRequest.create({
            ...request,
            ATTRIB_03: fileName,
            ATTRIB_11: request['ATTRIB_11.value'],
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

async function getTickets(req, res, next) {
    let params = req.query

    try {
        let data = await AdminRequest.findAll({
            where: {
                emp_id: params.emp_id,
                type_cd: params.type_cd
            },
            include: [
                {
                    model: ListValues,
                    as: "expenseType",
                    attributes: [
                        "val"
                    ]
                }
            ],
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

async function getRequestedTickets(req, res, next) {
    let params = req.query

    try {
        let data = await AdminRequest.findAll({
            where: {
                [Op.and]: [
                    { bu_id: params.bu_id },
                    { type_cd: params.type_cd },
                ]
            },
            include: [
                {
                    model: Employee,
                    as: "requestor",
                    attributes: [
                        "fst_name",
                        "last_name"
                    ]
                },
                {
                    model: ListValues,
                    as: "expenseType",
                    attributes: [
                        "val"
                    ]
                }
            ],
        })

        res.status(200).json({
            status: 200,
            data: data,
        })
    }
    catch (err) {
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function getTicketsCount(req, res, next) {
    let details = req.query

    try {
        let data = await AdminRequest.count(
            {
                where:
                {
                    bu_id: details.bu_id,
                    type_cd: 'IT-Ticket'
                }
            })

        res.status(200).json({
            status: 200,
            data
        })
    }
    catch (err) {
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function updateTicketRequested(req, res, next) {
    let details = req.body
    
    try {
        let data = await AdminRequest.update(
            {
                stat_cd: details.stat_cd,
                ATTRIB_04: details.msg,
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

async function updateHRDocs(req, res, next) {
    let details = req.body

    if (details.fileName === null) {
        fileName = null
    }
    
    try {
        let data = await AdminRequest.update(
            {
                stat_cd: details.stat_cd,
                ATTRIB_04: details.msg,
                ATTRIB_03: fileName,
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

async function uploadTicketFile(req, res, next) {
    let time = Date.now()
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `${process.env.ROOT_DIRECTORY}public/my_services_files`)
        },

        filename: function (req, file, cb) {
            var fileExtension = file.originalname.split('.')
            cb(null, `${file.fieldname}-${time}.${fileExtension[fileExtension.length - 1]}`)
            let name = `${process.env.ROOT_DIRECTORY}/public/my_services_files/` + `${file.fieldname}-${time}.${fileExtension[fileExtension.length - 1]}`
            fileNameSet(name)
            console.log("FILLLLEEEEEE NAAAAMMEE ", fileName)
        },
    })

    var upload = multer({ storage: storage }).array('file')

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)
    })
}

async function downloadTicketFile(req, res, next) {
    let { path } = req.query
    res.download(path);
}

async function postNotification(req, res, next) {
    let request = req.body
    try {
        let data = await Notification.create({
            ...request,
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

async function getNotifications(req, res, next) {
    let details = req.query

    try {
        let data = await Notification.findAll(
            {
                where:
                {
                    emp_id: details.emp_id,
                    bu_id: details.bu_id
                },
                order: [[ 'created', 'DESC' ]]
            })

        res.status(200).json({
            status: 200,
            data
        })
    }
    catch (err) {
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function countNotifications(req, res, next) {
    let details = req.query

    try {
        let data = await Notification.count(
            {
                where:
                {
                    emp_id: details.emp_id,
                    bu_id: details.bu_id,
                    stat_cd: details.stat_cd
                }
            })

        res.status(200).json({
            status: 200,
            data
        })
    }
    catch (err) {
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function updateNotifications(req, res, next) {
    let details = req.body

    try {
        let data = await Notification.update(
            {
                stat_cd: details.stat_cd,
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
    getLeavesCount,
    getContracts,
    acceptContract,
    rejectContract,
    postTicketRequest,
    getTickets,
    getTicketsCount,
    uploadTicketFile,
    downloadTicketFile,
    getRequestedTickets,
    updateTicketRequested,
    updateHRDocs,
    postNotification,
    getNotifications,
    countNotifications,
    updateNotifications
}
