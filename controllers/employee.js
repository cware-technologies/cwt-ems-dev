const models = require('../db/models'),
    Employee = models.C_EMP,
    Organization = models.C_BU

async function getEmployees(req, res, next){
    try{
        let data = await Employee.findAll({
                where: {
                    bu_id: req.query.bu_id,
                },
                include: [{
                    model: Organization,
                    as: 'organization',
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

module.exports ={
    getEmployees,
}