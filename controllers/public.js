const Op = require('sequelize').Op,
    models = require('../db/models'),
    Employee = models.C_EMP,
    Position = models.C_POSTN

async function searchEmployee(req, res, next){
    let search = req.query
    console.log(search)
    let query = search.query.split(' ')

    try{
        let data = await Employee.findAll({
            where: {
                [Op.or]: { 
                    fst_name: {
                        [Op.substring]: query[0],
                    },
                    last_name: {
                        [Op.substring]: query[1] || query[0],
                    },
                }
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
        err.status = 404
        err.message = `Database Error: ${err}`
        next(err)
    }
}

module.exports = {
    searchEmployee,
}