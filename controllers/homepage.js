const models = require('../db/models'),
    News = models.C_ORG_NEWS;
    Sequelize = require('sequelize')
    Op = Sequelize.Op;

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
        next(error)
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
        next(error)
    }
}

async function getAnnouncements(req, res, next) {
    try{
        let data = await News.findAll({
            where: {
                stat_cd: 'active',
                type_cd: 'annoucements',

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
        next(error)
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
        next(error)
    }
}

module.exports = {
    getNews,
    getEmployeeNews,
    getAnnouncements,
    getExternalFeeds,
}