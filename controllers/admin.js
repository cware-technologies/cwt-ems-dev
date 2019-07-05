const models = require('../db/models'),
    User = models.C_USER,
    Employee = models.C_EMP,
    Organization = models.C_BU,
    Division = models.C_DIV,
    Position = models.C_POSTN,
    Responsibility = models.C_RESP,
    ResponsibilityView = models.C_RESP_VIEW,
    Document = models.C_DOC,
    View = models.C_VIEW,
    News = models.C_ORG_NEWS,
    ListOfValues = models.C_LST_VAL,
    ProfileAttribute = models.C_EMP_XM,
    Sequelize = require('sequelize'),
    sequelize = require('../db/models').sequelize,
    Op = Sequelize.Op,
    fs = require('fs')
    

async function getOrganizations(req, res, next){
    try{
        let data = await Organization.findAll({
                where: {
                    row_id: {
                        [Op.not]: 1,
                    }
                },
                include: [{
                    model: Organization,
                    as: 'parent',
                    attributes: ['row_id','name'],
                }],
            }
        )
        
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

async function postOrganization(req, res, next){
    let organization = req.body

    if(!organization.par_row_id){
        organization.par_row_id = 1
    }

    try{
        let data = await Organization.upsert(organization)
        try{
            let data2 = await Organization.findOne({
                where: { 
                    name: organization.name
                }
            })
            res.status(200).json({
                status: 200,
                result: data2,
                updated: !data,
            })

        }
        catch(err){
            res.status(200).json({
                status: 200,
                result: data,
            })
        }
    }
    catch(err){
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function getDivisions(req, res, next){
    console.log("DIVISION QUERY: ", req.query)
    try{
        let data = await Division.findAll({
            where:{
                ...req.query
            },
            include: [
                {
                    model: Organization,
                    as: 'organization',
                    attributes: ['row_id', 'name'],
                },
                {
                    model: Division,
                    as: 'parent',
                    attributes: ['row_id', 'name'],
                }
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

async function postDivision(req, res, next){
    let division = req.body

    try{
        let data = await Division.upsert(division)
        
        try{
            let data2 = await Division.findOne({
                where: { 
                    name: division.name
                }
            })
            res.status(200).json({
                status: 200,
                result: data2,
                updated: !data,
            })

        }
        catch(err){
            res.status(200).json({
                status: 200,
                result: data,
            })
        }
    }
    catch(err){
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function getPositions(req, res, next){
    try{
        let data = await Position.findAll({
            where:{
                bu_id: req.query.bu_id && req.query.bu_id,
                div_id: req.query.div_id && req.query.div_id,
            },
            include: [
                {
                    model: Organization,
                    as: 'organization',
                    attributes: ['row_id', 'name'],
                },
                {
                    model: Division,
                    as: 'division',
                    attributes: ['row_id', 'name'],
                },
                {
                    model: Position,
                    as: 'parent',
                    attributes: ['row_id', 'name'],
                }
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

async function postPosition(req, res, next){
    let position = req.body

    try{
        let data = await Position.upsert(position)

        try{
            let data2 = await Position.findOne({
                where: {
                    name: position.name,
                }
            })

            res.status(200).json({
                status: 200,
                result: data2,
                updated: !data,
            })
        }
        catch(err){
            res.status(200).json({
                status: 200,
                result: data,
            })
        }
    }
    catch(err){
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function getResponsibilities(req, res, next){
    let where = req.query.bu_id ?  {
        bu_id: req.query.bu_id,
    }: {}

    try{
        let data = await Responsibility.findAll({
            where,
            include: [
                {
                    model: Organization,
                    as: 'organization',
                    attributes: ['row_id', 'name'],
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

async function postResponsibilities(req, res, next){
    let responsibility = req.body

    try{
        let data = await Responsibility.create({
            name: responsibility.name,
            desc: responsibility.desc,
            bu_id: responsibility.organization,
        })

        try{
            let data2 = await Responsibility.findOne({
                where: {
                    row_id: data.row_id
                },
                include: [
                    {
                        model: Organization,
                        as: 'organization',
                        attributes: ['row_id', 'name'],
                    },
                ]
            })

            res.status(200).json({
                status: 200,
                result: data2,
            })
        }
        catch(err){
            err.status = 400
            err.message = `Database Error: ${err}`
            next(err)
        }
    }
    catch(err){
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function getViews(req, res, next){
    let where = req.query.resp_id ? {
        resp_id: req.query.resp_id,
    } : {
        bu_id: req.query.bu_id,
    }

    try{
        let data = await View.findAll({
            where: where,
            include: [
                {
                    model: Organization,
                    as: 'organization',
                    attributes: ['row_id', 'name'],
                },
                {
                    model: Responsibility,
                    through: 'c_resp_view',
                    as: 'responsibility',
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

async function postView(req, res, next){
    let view = req.body
    console.log(view)

    try{
        data = await View.create({
            name: view.name,
            desc: view.desc,
            ATTRIB_01: view.path,
            ATTRIB_02: view.location,
            bu_id: /* view.organization */1,
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

async function postResponsibilityView(req, res, next){
    let views = req.body.views
    let responsibility = req.body.resp_id
    let organization = req.body.bu_id

    let promises = views.map(view => {
        return ResponsibilityView.create({
            view_id: view,
            resp_id: responsibility,
            bu_id: organization,
            FLG_01: 1,
            FLG_02: 0,
        })
    })

    Promise.all(promises)
    .then(result =>
        res.status(200).json({
            status: 200,
            result,
        })
    )
    .catch(err => {
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    })
    // try{
    //     data = await ResponsibilityView.create({
    //         view_id: req.body.view_id,
    //         resp_id: req.body.resp_id,
    //         bu_id: req.body.bu_id,
    //         FLG_01: 1,
    //         FLG_02: 0,
    //     })

    //     res.status(200).json({
    //         status: 200,
    //         result: data,
    //     })
    // }
    // catch(err){
    //     err.status = 400
    //     err.message = `Database Error: ${err}`
    //     next(err)
    // }
}

async function getResponsibilityViews(req, res, next){
    try{
        let data = await Responsibility.findAll({
            where:{
                row_id: req.query.resp_id && req.query.resp_id,
            },
            include: [
                {
                    model: View,
                    through: 'c_resp_view',
                    as: 'view',
                },
                // {
                //     model: Responsibility,
                //     // through: 'c_resp_view'
                // },
            ]
        })
        // console.log(data)
        // let views = data.getC_VIEWs()
        // console.log(views)
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

async function updateResponsibilityView(req, res, next){
    let updates = req.body.updates
    let keys = Object.keys(updates)
    let values = []
    keys.forEach(key => {
        values.push({
            row_id: parseInt(key, 10),
            ...updates[key],
        })
    })

    console.log(values)

    let promises = values.map(async value => ResponsibilityView.update(value, { where: {row_id: value.row_id }}))
    
    Promise.all(promises)
    .then(result =>
        res.status(200).json({
            status: 200,
            data: result,
        })
    )
    .catch(err => {
            err.status = 400
            err.message = `Database Error: ${err}`
            next(err)
        }
    )
}

async function deleteResponsibilityView(req, res, next){
    try{
        let data = await ResponsibilityView.destroy({ where: { row_id: req.body.id }})

        res.status(200).json({
            status: 200,
            data
        })
    }
    catch(err){
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function getHRDocs(req, res, next){
    try{
        let data = await Document.findAll({})

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

function deleteDocFromStorage(path){
    return new Promise((resolve, reject) => {
        fs.unlink(path, error => {
            if(error)
                reject('Cannot delete files')
            else(
                resolve('resolved')
            )
        })
    })
    
}

async function deleteHRDocs(req, res, next){
    let documents = req.body.documents
    let paths = req.body.paths

    console.log(documents, "     ", paths)

    Promise.all(paths.map(path => deleteDocFromStorage(path)))
    .then(async results => {
        try{
            let data = await Document.destroy({
                where: {
                    row_id: documents
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
    })
    .catch(err => {
        err.status = 404
        err.message = ''
        next(err)
    })
}

async function uploadHRDoc(req, res, next){
    try{
        let data = await Document.create({
            name: req.body.name,
            path: req.file.path,
        })

        res.status(200).json({
            status: 200,
            result: data,
        })
    }
    catch(err){
        err.status = 400
        err.message = `Database Error: ${err}`
        fs.unlink(req.file.path, error => {
            next(err)
        })
    }
}

async function downloadHRDoc(req, res, next){
    console.log("QUERY: ", req.query)
    let { path } = req.query
    res.download(path);
}

async function postNews(req, res, next){
    let news = req.body

    try{
        let data = await News.create({
            ATTRIB_10: news.title,
            ATTRIB_01: news.body ? news.body : '',
            type_cd: news.type,
            status: news.status,
            ATTRIB_02: news.link ? news.link : '',
            bu_id: news.organization
        })

        res.status(200).json({
            status: 200,
            result: data,
        })
    }
    catch(err){
        err.status = 400
        err.message = `Database Error: ${err}`
        fs.unlink(req.file.path, error => {
            next(err)
        })
    }
}

async function changeNewsStatus(req, res, next){
    let checked = req.body.checked
    let news = req.body.news

    try{
        let data = await News.update({ stat_cd: checked }, { where: { row_id: news }})

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

async function getInductionExitLOVS(req, res, next){
    let entity = req.query
    console.log(entity)

    try{
        let data = await ListOfValues.findAll({
            where: {
                bu_id: entity.organization,
                [Op.or]: [{type: 'induction_checklist'}, {type: 'exit_checklist'}],
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

async function postInductionExitLOVS(req, res, next){
    let entity = req.body

    try{
        let data = await ListOfValues.create(entity)

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
async function updateInductionExitLOVS(req, res, next){
    let entity = req.body

    try{
        let data = await ListOfValues.update(entity, { where: {row_id: entity.row_id }})

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

async function deleteInductionExitLOVS(req, res, next){
    let entity = req.body

    try{
        let data = await ListOfValues.destroy({ where: {row_id: entity.row_id }})

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

async function applyForInductionExit(req, res, next){
    let application = req.body
    console.log("APPLICATION: ", application)

    try{
        let data = await ListOfValues.findAll({
            where: {
                bu_id: application.organization,
                type: application.type,
            }
        }).map(el => {
            el.get({ plain: true })
            let picked = (({ row_id, val, type }) => ({ name: val, type, emp_id: application.employee, ATTRIB_11: row_id, FLG_01: false }))(el);
            return picked
        })

        console.log(data)

        let data2 = await ProfileAttribute.bulkCreate(data)

        res.status(200).json({
            status: 200,
            result: data2,
        })
    }
    catch(err){
        err.status = 400
        err.message = err.name === 'SequelizeUniqueConstraintError' ? 'Already Applied' : `Database Error: ${err}`
        next(err)
    }
}

async function getInductionExit(req, res, next){
    let employee = req.query

    try{
        let data = await ProfileAttribute.findAll({
            where: {
                emp_id: employee.employee,
                [Op.or]: [
                    {type: 'induction_checklist'},
                    {type: 'exit_checklist'},
                ]
            }
        })

        res.status(200).json({
            status: 200,
            result: data,
        })
    }catch(err){

    }
}

async function updateInductionExit(req, res, next){
    let updates = req.body.updates
    let keys = Object.keys(updates)
    let values = []
    keys.forEach(key => {
        values.push({
            row_id: parseInt(key, 10),
            ...updates[key],
        })
    })

    console.log(values)

    values.forEach(async value => {
        try{
            let data = await ProfileAttribute.update(value, { where: {row_id: value.row_id }})

            res.status(200).json({
                status: 200,
                result: data,
            })
        }
        catch(err){
            console.log(err)
        }
    })
}

async function getLeaveTypeLOVS(req, res, next){
    let entity = req.query
    console.log(entity)

    try{
        let data = await ListOfValues.findAll({
            where: {
                bu_id: entity.organization,
                type: 'leave_type',
            },
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

async function postLeaveTypeLOVS(req, res, next){
    let entity = req.body

    try{
        let data = await ListOfValues.create(entity)

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

async function updateLeaveTypeLOVS(req, res, next){
    let entity = req.body

    try{
        let data = await ListOfValues.update(entity, { where: {row_id: entity.row_id }})

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

async function deleteLeaveTypeLOVS(req, res, next){
    let entity = req.body

    try{
        let data = await ListOfValues.destroy({ where: {row_id: entity.row_id }})

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

async function getEmployees(req, res, next){
    let search = req.query
    let query = search.query.split(' ')

    try{
        let data = await User.findAll({
            where: {
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
            },
            attributes: ['row_id', 'login'],
            include: [
                {
                    model: Employee,
                    as: 'employee',
                    include: [
                        {
                            model: Organization,
                            as: 'organization',
                        },
                        {
                            model: Division,
                            as: 'division'
                        },
                        {
                            model: Position,
                            as: 'position_held',
                        },
                        {
                            model: Responsibility,
                            as: 'responsibility',
                        },
                    ]
                },
            ]
        })

        res.status(200).json({
            status: 200,
            data,
        })
    }
    catch(err){

    }
}

async function updateEmployee(req, res, next){
    console.log("UPDAAAATTTTTEEE!!!")
    console.log(req.body)
    
    let employee = (({emp_num, fst_name, last_name, bu_id, div_id, resp_id, postn_held_id, report_to_id, pr_postn_id}) => ({emp_num, fst_name, last_name, bu_id: bu_id.value, div_id: div_id.value, resp_id: resp_id.value, postn_held_id: postn_held_id.value, report_to_id: report_to_id.value}))(req.body)
    let user = (({login, fst_name, last_name, bu_id, div_id, resp_id}) => ({login, fst_name, last_name, bu_id: bu_id.value, div_id: div_id.value, resp_id: resp_id.value}))(req.body)
    
    return sequelize.transaction(t => {
        return Employee.update(employee, { where: { row_id: req.body.row_id }}, { transaction: t })
        .then(emp => {
            return User.update(user, { where: { login: req.body.login }}, { transaction: t });
        });
    }).then(result => {
        res.status(200).json({
            status: 200,
            data: result,
        })
    }).catch(err => {
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    });
}

async function deleteEmployee(req, res, next){
    let employee = req.body

    return sequelize.transaction(t => {
        return Employee.destroy({ where: { row_id: employee.row_id }}, { transaction: t })
        .then(result => {
            return User.destroy({ where: { row_id: employee.row_id }}, { transaction: t })
        })
    }).then(result => {
        res.status(200).json({
            status: 200,
            data: result,
        })
    }).catch(err => {
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    })

}

async function changeEmployeeStatus(req, res, next){
    let checked = req.body.checked
    let employee = req.body.employee

    try{
        let data = await Employee.update({FLG_01: checked}, { where: { row_id: employee }})

        res.status(200).json({
            status: 200,
            message: 'Employee status updated',
        })
    }
    catch(err){
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function getEmployeeEntitlements(req, res, next){
    let employee = req.query

    try{
        let data = await ProfileAttribute.findAll({
            where: {
                emp_id: employee.employee,
                type: 'leave_type',
            },
            include: [
                {
                    model: ListOfValues,
                    as: 'function',
                    attributes: ['val', 'ATTRIB_11'],
                }
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

async function deleteEmployeeEntitlements(req, res, next){
    let entity = req.body

    try{
        let data = await ProfileAttribute.destroy({ where: {row_id: entity.row_id }})

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

async function applyForEntitlement(req, res, next){
    let application = req.body
    console.log("APPLICATION: ", application)

    try{
        let data = await ProfileAttribute.create({
            type: 'leave_type',
            name: application.name,
            emp_id: application.employee,
            ATTRIB_11: application.leave,
        })

        res.status(200).json({
            status: 200,
            result: [data],
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
                    {type: 'official_details'},
                    {type: 'payroll_details'},
                    {type: 'assets_details'},
                    {type: 'insurance_details'},
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

module.exports = {
    getOrganizations,
    postOrganization,
    getDivisions,
    postDivision,
    getPositions,
    postPosition,
    getResponsibilities,
    postResponsibilities,
    getViews,
    postView,
    getResponsibilityViews,
    postResponsibilityView,
    updateResponsibilityView,
    deleteResponsibilityView,
    getHRDocs,
    deleteHRDocs,
    uploadHRDoc,
    downloadHRDoc,
    postNews,
    changeNewsStatus,
    getInductionExitLOVS,
    postInductionExitLOVS,
    updateInductionExitLOVS,
    deleteInductionExitLOVS,
    applyForInductionExit,
    getInductionExit,
    updateInductionExit,
    getLeaveTypeLOVS,
    postLeaveTypeLOVS,
    updateLeaveTypeLOVS,
    deleteLeaveTypeLOVS,
    getEmployeeEntitlements,
    deleteEmployeeEntitlements,
    applyForEntitlement,
    searchEmployeeDetails,
    upsertEmployeeDetails,
    getEmployees,
    updateEmployee,
    deleteEmployee,
    changeEmployeeStatus,
}