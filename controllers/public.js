'use strict';

const Op = require('sequelize').Op,
    models = require('../db/models'),
    User = models.C_USER,
    Employee = models.C_EMP,
    Division = models.C_DIV,
    Position = models.C_POSTN,
    Sequelize = require('sequelize'),
    sequelize = require('../db/models').sequelize

async function searchEmployee(req, res, next) {
    let search = req.query
    let where = search
    console.log(search)

    let tableMapping = {
        bu_id: 'C_BU',
        div_id: 'C_DIV',
        postn_held_id: 'C_POSTN',
        resp_id: 'C_RESP',
    }

    if (search.name) {
        let query = search.name.split(' ')

        where = {
            [Op.or]: {
                fst_name: {
                    [Op.substring]: query[0],
                },
                last_name: {
                    [Op.substring]: query[1] || query[0],
                },
            }
        }
    }
    else if (search.ATTRIB_01) {
        where = {
            ATTRIB_01: {
                [Op.substring]: search.ATTRIB_01,
            },
        }
    }
    else if (search.emp_num) {
        where = {
            emp_num: {
                [Op.substring]: search.emp_num,
            },
        }
    }
    else if (Object.keys(search).length > 0) {
        let keys = Object.keys(search)
        keys.forEach(key => {
            let tempSQL1 = sequelize.dialect.QueryGenerator.selectQuery(tableMapping[key], {
                attributes: ['row_id'],
                where: {
                    name: {
                        [Op.substring]: search[key],
                    }
                }
            }).slice(0, -1)

            console.log(tempSQL1, [key])

            where = {
                ...where,
                [key]: {
                    [Op.in]: Sequelize.literal(`(${tempSQL1})`)
                }
            }
        })

        where.bu_id = {
            ...where.bu_id,
            [Op.not]: 1,
        }
    }

    try {
        let data = await Employee.findAll({
            where,
            include: [
                {
                    model: Division,
                    as: 'division',
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
                    attributes: {
                        exclude: ['row_id',],
                    }
                },
            ]
        })

        res.status(200).json({
            status: 200,
            result: data,
        })
    }
    catch (err) {
        err.status = 404
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function expandHierarchy(root) {
    function expand(root) {
        return root.getManager().then(manager => {
            return new Promise((resolve, reject) => {
                if (manager.get({ plain: true }).report_to_id === null) {
                    return resolve()
                }

                reportingChain.push(manager.get({ plain: true }))
                return resolve(root.children.push(expand(manager)))
            })
        })
    }
    // let reportingChain = {}

    // return new Promise((resolve, reject) => {
    //     Promise.resolve().then(first => {
    //         console.group( "Recursion - external function." );
    //         return( root );
    //     }).then(root => {
    //         let hierarchy = expand(root)
    //         console.log("STEP: ", hierarchy)
    //         return hierarchy
    //     }).then((hierarchy) => {
    //         // console.log("HIGHER ARCHY", hierarchy)
    //         console.groupEnd()
    //         resolve(hierarchy)
    //     })

    //     function expand(root){
    //         let raw = root.get({plain: true})
    //         console.log( "Entering recursive function for [", raw.fst_name, "]." );

    //         if(raw.report_to_id === null){
    //             console.log("RETURN NULL: ", raw.fst_name)
    //             return raw.fst_name
    //         } 
    //         var hierarchy = Promise.resolve().then(() => root.getManager().then((root) => 
    //             {
    //                 return root.children = expand(root)// RECURSE!
    //             }
    //         ))
    //         console.log("DONE!")
    //         return( hierarchy );
    //     }
    // })


    // let reportingChain = root.get({plain: true})
    // reportingChain.children = []

    // try{
    //     if(root){
    //         return expand(root, reportingChain).then(result => reportingChain )
    //     }
    //     else{
    //         return "EMPTY"
    //     }
    // }
    // catch(err){
    //     console.log(err)
    // }
}

function recursiveHierarchy(root) {
    return new Promise((resolve, reject) => {
        console.log("START!")
        let hierarchy = []
        let chain

        function expand(root) {
            return new Promise((resolve, reject) => {
                root && root.getManager().then(manager => {
                    if (manager && manager.get({ plain: true }).report_to_id === null) {
                        let plain = manager.get({ plain: true })
                        let current = {
                            "name": plain.full_name,
                            "children": null,
                        }

                        return resolve(current)
                    }
		    else if(manager === null){
		    	return resolve(null)
			}

                    chain = Promise.resolve().then(() => expand(manager).then((res) => {
                        // console.log("NAME: ", res)
                        let plain = manager.get({ plain: true })
                        // let current = JSON.parse(JSON.stringify(manager.get({ plain: true })))
                        let current = {
                            "name": plain.full_name,
                            "children":[
                                res,
                            ]
                        }

                        // console.log("CURRENT: ", current)

                        return resolve(current)
                    }))
                })
            })
        }

        Promise.resolve().then(() =>
            root
        ).then(res =>
            expand(res)
        ).then(result => {
            resolve(result)
        })
.catch(err => console.log(err))
    })
}

async function getEmployeeHierarchy(req, res, next) {
    // const data = await Employee.findOne({
    //     where: { row_id: req.query.employee },
    //     include: {
    //       model: Employee,
    //       as: 'manager',
    //       hierarchy: true
    //     }
    //   });
    console.log("Query: ", req.query)
    try {
        const data = await User.findOne({
            where: {
                row_id: req.query.employee,
            },
        });

	let root = data.getEmployee()

        let hierarchy = await recursiveHierarchy(root)
        let plain = data.get({plain: true})
        let response = {
            name: `${plain.fst_name} ${plain.last_name}`,
            children: hierarchy !== null &&  [ hierarchy ]
        }
	
        res.json({
	    status: 200,
            data: response,
        })
    }
    catch (err) {
	next(err)
    }
}

module.exports = {
    searchEmployee,
    getEmployeeHierarchy,
}
