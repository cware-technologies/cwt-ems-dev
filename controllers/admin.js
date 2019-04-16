const models = require('../db/models'),
    Organization = models.C_BU,
    Division = models.C_DIV,
    Position = models.C_POSTN,
    Responsibility = models.C_RESP,
    Sequelize = require('sequelize')
    

async function getOrganizations(req, res, next){
    try{
        let data = await Organization.findAll({
                include: [{
                    model: Organization,
                    as: 'parent',
                    attributes: ['row_id','name'],
                }]
            }
        ).map(el => el.get({ plain: true }))

        console.log(data)

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

    Organization.create({
        name: organization.name,
        par_row_id: organization.parent,
    }).then(result => {
        res.status(200).json({
            status: 200,
            result: result,
        })
    }).catch((err) => {
        err.status = 400
        next(err)
    })
}

async function getDivisions(req, res, next){
    console.log(req.query)
    try{
        let data = await Division.findAll({
            where:{
                bu_id: req.query.bu_id && req.query.bu_id
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
    console.log(division)
    Division.create({
        name: division.name,
        par_row_id: division.parent,
        bu_id: division.organization,
    },{
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
    }).then(result => {
        res.status(200).json({
            status: 200,
            result: result,
        })
    }).catch((err) => {
        err.status = 400
        next(err)
    })
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

    Position.create({
        name: position.name,
        par_row_id: position.parent,
        bu_id: position.organization,
        div_id: position.division,
    },{
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
    }).then(result => {
        res.status(200).json({
            status: 200,
            result: result,
        })
    }).catch((err) => {
        err.status = 400
        next(err)
    })
}

async function getResponsibilities(req, res, next){
    try{
        let data = await Responsibility.findAll({
            where:{
                bu_id: req.query.bu_id && req.query.bu_id,
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
            result: data,
        })
    }
    catch(err){
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

module.exports = {
    getOrganizations,
    postOrganization,
    getDivisions,
    postDivision,
    getPositions,
    postPosition,
    getResponsibilities,
}