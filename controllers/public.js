const Op = require('sequelize').Op,
    models = require('../db/models'),
    Employee = models.C_EMP

async function searchEmployee(req, res, next){
    let search = req.query
    console.log(search)
    try{
        let data = await Employee.findAll({
            where: {
                [Op.or]: { 
                    fst_name: {
                        [Op.substring]: search.query,
                    },
                    last_name: {
                        [Op.substring]: search.query,
                    }
                }
            }
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

module.exports = {
    searchEmployee,
}