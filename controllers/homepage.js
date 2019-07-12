const models = require('../db/models'),
    News = models.C_ORG_NEWS;
    Sequelize = require('sequelize')
    Op = Sequelize.Op;

async function getAllNews(req, res, next) {
    let where = req.query.query ? 
        {
            [Op.or]: {
                ATTRIB_10: {
                    [Op.substring]: req.query.query
                },
                ATTRIB_01: {
                    [Op.substring]: req.query.query
                },
            }
            
        } :
        {}

    try{
        let data = await News.findAll({
            where,
            // limit: 5,
            order: [['created', 'DESC']],
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

async function deleteNews(req, res, next) {
    try{
        let data = News.destroy({ where: { row_id: req.body.row_id }})
    }
    catch(err){
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function getNews(req, res, next) {
    try{
        let data = await News.findAll({
            where: {
                stat_cd: 'active',
                type_cd: 'company news',

            },
            limit: 5,
            order: [['created', 'DESC']],
        })

        res.status(200).json({
            status: 200,
            news: data,
        })
    }
    catch(err){
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
    
}

async function getEmployeeNews(req, res, next) {
    try{
        let data = await News.findAll({
            where: {
                stat_cd: 'active',
                type_cd: 'employee news',

            },
            limit: 5,
            order: [['created', 'DESC']],
        })

        res.status(200).json({
            status: 200,
            news: data,
        })
    }
    catch(err){
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function getAnnouncements(req, res, next) {
    try{
        let data = await News.findAll({
            where: {
                stat_cd: 'active',
                type_cd: 'announcements',

            },
            limit: 5,
            order: [['created', 'DESC']],
        })

        res.status(200).json({
            status: 200,
            news: data,
        })
    }
    catch(err){
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function getExternalFeeds(req, res, next) {
    try{
        let data = await News.findAll({
            where: {
                stat_cd: 'active',
                [Op.or]: [
                    {type_cd: 'Local'},
                    {type_cd: 'Economy'},
                    {type_cd: 'Technology'},
                ]
            },
            limit: 5,
            order: [['created', 'DESC']],
        })

        res.status(200).json({
            status: 200,
            news: data,
        })
    }
    catch(err){
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

module.exports = {
    getAllNews,
    deleteNews,
    getNews,
    getEmployeeNews,
    getAnnouncements,
    getExternalFeeds,
}