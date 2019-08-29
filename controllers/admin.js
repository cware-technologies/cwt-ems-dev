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
    AdminRequest = models.C_ADM_REQ,
    Sequelize = require('sequelize'),
    sequelize = require('../db/models').sequelize,
    Op = Sequelize.Op,
    fs = require('fs'),
    path = require('path'),
    url = require('url'),
    multer = require('multer')

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

    console.log(organization)

    if(!organization.par_row_id){
        organization.par_row_id = 1
    }

    try{
        let data = await Organization.upsert({
            ...organization,
            par_row_id: organization['par_row_id.value'],
        })
        try{
            let data2 = await Organization.findOne({
                where: { 
                    name: organization.name
                },
                include: [
                    {
                        model: Organization,
                        as: 'parent',
                        attributes: ['row_id', 'name'],
                    }
                ]
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

async function deleteOrganization(req, res, next){
    try{
        let data = await Organization.destroy({ where: { row_id: req.body.id }})

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
        let data = await Division.upsert({
            ...division,
            par_row_id: division['par_row_id.value']
        })
        
        try{
            let data2 = await Division.findOne({
                where: { 
                    name: division.name
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
                    },
                ]
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

async function deleteDivision(req, res, next){
    try{
        let data = await Division.destroy({ where: { row_id: req.body.id }})

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

async function getPositions(req, res, next){
    let where = req.query

    try{
        let data = await Position.findAll({
            where,
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
        let data = await Position.upsert({
            ...position,
            par_row_id: position['par_row_id.value'],
        })

        try{
            let data2 = await Position.findOne({
                where: {
                    name: position.name,
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
                    },
                ]
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

async function deletePosition(req, res,next){
    try{
        let data = await Position.destroy({ where: { row_id: req.body.id }})

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

    console.log(responsibility)

    try{
        let data = await Responsibility.create({
            ...responsibility,
            bu_id: responsibility['bu_id.value'],
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

async function updateResponsibilities(req, res, next){
    let responsibility = req.body

    console.log(responsibility)

    try{
        let data = await Responsibility.update({
            ...responsibility,
            bu_id: responsibility['bu_id.value'],
        }, {
            where: {
                row_id: responsibility.row_id,
            }
        })

        try{
            let data2 = await Responsibility.findOne({
                where: {
                    row_id: responsibility.row_id
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

    try{
        data = await View.upsert(view)

        try{
            let data2 = await View.findOne({
                where: {
                    name: view.name
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
                inserted: data,
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

function deleteDocFromStorage(document){
    return new Promise((resolve, reject) => {
        fs.unlink(document.path, async(error) => {
            if(error)
                reject('Cannot delete files')
            else{
                try{
                    let data = await Document.destroy({
                        where: {
                            row_id: document.id
                        }
                    })

                    resolve('resolved')
                }
                catch(err){
                    reject('Cannot delete files')
                }
            }
        })
    })
    
}

async function deleteHRDocs(req, res, next){
    let { documents } = req.body

    console.log(documents)

    Promise.all(documents.map(document => deleteDocFromStorage(document)))
    .then(results => {
        res.status(200).json({
            status: 200,
            results,
        })
    })
    .catch(err => {
        err.status = 404
        err.message = 'err'
        next(err)
    })
}

async function uploadHRDoc(req, res, next){
    var storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'public/uploads/documents')
        },
        filename: (req, file, cb) => {
            var fileExtension = file.originalname.split('.')
            cb(null, `${file.fieldname}-${Date.now()}.${fileExtension[fileExtension.length - 1]}`);
        }
    });

    var upload = multer({ storage: storage });
    upload.single('file')(req, res, async (err) => {
        if(err){
            return res.status(400).json({ status: 400, message: "Upload Failed" });
        }

        let pathString = req.file.path.replace(/\\/g,"/");

        try{
            let data = await Document.create({
                name: req.body.name,
                path: pathString,
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

    })

}

async function downloadHRDoc(req, res, next){
    console.log("QUERY: ", req.query)
    let { path } = req.query
    res.download(path);
}

async function postNews(req, res, next){
    let message = ''
    let upload
    console.log(req.headers)
    if(req.header('contains-file') === 'true'){
        var storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'public/uploads/images/news/covers')
            },
            filename: (req, file, cb) => {
                var fileExtension = file.originalname.split('.')
                cb(null, `${file.fieldname}-${Date.now()}.${fileExtension[fileExtension.length - 1]}`);
            }
        });

        upload = multer({ storage: storage });

        upload.single('file')(req, res, async (err) => {
            if(err){
                return res.status(200).json({ status: 400, data: {}, message: `News Creation Failed : ${err}` });
            }

            let news = req.body
            // let filePath = path.relative('/public', req.file.destination) + "/" + req.file.filename
            let fileURL = req.file.path.replace(/\\/g, "/").substring("public".length);
            console.log('PATH: ', fileURL)


            try{
                let data = await News.create({
                    ATTRIB_10: news.ATTRIB_10,
                    ATTRIB_01: news.ATTRIB_01 ? news.ATTRIB_01 : null,
                    type_cd: news['type_cd.value'],
                    ATTRIB_02: news.ATTRIB_02 ? news.ATTRIB_02 : null,
                    bu_id: news.bu_id,
                    img_pth: fileURL,
                })
        
                res.status(200).json({
                    status: 200,
                    data,
                })
            }
            catch(err){
                err.status = 400
                err.message = `Database Error: ${err}`
                fs.unlink(req.file.path, error => {
                    if(error)
                        next(error)
                    next(err)
                })
            }
        })
    }
    else {
        upload = multer()

        upload.none()(req, res, async (err) => {
            if(err){
                return res.status(200).json({ status: 400, data: {}, message: `News Creation Failed : ${err}` });
            }

            let news = req.body
            console.log(news)
            try{
                let data = await News.create({
                    ATTRIB_10: news.ATTRIB_10,
                    ATTRIB_01: news.ATTRIB_01 ? news.ATTRIB_01 : null,
                    type_cd: news['type_cd.value'],
                    ATTRIB_02: news.ATTRIB_02 ? news.ATTRIB_02 : null,
                    bu_id: news.bu_id,
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
        })
    }
}

async function updateNews(req, res, next){
    if(req.header('contains-file') === 'true'){
        var storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'public/uploads/images/news/covers')
            },
            filename: (req, file, cb) => {
                var fileExtension = file.originalname.split('.')
                cb(null, `${file.fieldname}-${Date.now()}.${fileExtension[fileExtension.length - 1]}`);
            }
        });

        upload = multer({ storage: storage });

        upload.single('file')(req, res, async (err) => {
            if(err){
                return res.status(200).json({ status: 400, data: {}, message: `News Update Failed : ${err}` });
            }

            let news = req.body

            try{
                let data = await News.findOne({
                    where: { row_id: news.row_id },
                    attributes: ['img_pth'],
                })

                let path = data.img_pth
                path = "public" + path

                fs.unlink(path, error => {
                    
                })
            }
            catch(err){
                err.status = 400
                next(err)
            }

            
            // let filePath = path.relative('/public', req.file.destination) + "/" + req.file.filename
            let fileURL = req.file.path.replace(/\\/g, "/").substring("public".length);

            try{
                let data = await News.update({
                    ...news,
                    type_cd: news['type_cd.value'],
                    img_pth: fileURL,
                },{
                    where: {
                        row_id: news.row_id,
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
                fs.unlink(req.file.path, error => {
                    next(error)
                })
            }
        })
    }
    else {
        upload = multer()

        upload.none()(req, res, async (err) => {
            if(err){
                return res.status(200).json({ status: 400, data: {}, message: `News Update Failed : ${err}` });
            }

            let news = req.body
            console.log(news)
            try{
                let data = await News.update({
                    ...news,
                    type_cd: news['type_cd.value']
                }, {
                    where: {
                        row_id: news.row_id
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
        })
    }
}

async function deleteNews(req, res, next) {
    try{
        let data = News.destroy({ where: { row_id: req.body.row_id }})

        res.status(200).json({
            status: 200,
            message: "Post Successfully Deleted.",
            data,
        })
    }
    catch(err){
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
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

async function getEmployeeAssets(req, res, next){
    let entity = req.query
    console.log("ASSET: ", entity)

    try{
        let data = await ProfileAttribute.findAll({
            where: {
                bu_id: entity.bu_id,
                emp_id: entity.emp_id,
                type: 'asset',
            },
            include: [
                {
                    model: ListOfValues,
                    as: 'function',
                    attributes: ['val', 'ATTRIB_11']
                }
            ]
        }).map(ele => ele.get({ plain: true }))

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

async function getAssetLOVS(req, res, next){
    let entity = req.query
    console.log("POST ASSET: ", entity)

    try{
        let data = await ListOfValues.findAll({
            where:{
                bu_id: entity.bu_id,
                type: 'asset',
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

async function postAssetLOVS(req, res, next){
    let entity = req.body
    console.log("POST ASSET: ", entity)

    try{
        let data = await ListOfValues.upsert({
            ...entity,
            type: 'asset',
        })
        try{
            let data2 = await ListOfValues.findOne({
                where: { 
                    val: entity.val
                },
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

async function updateAssetLOVS(req, res, next){
    let entity = req.body

    try{
        let data = await ListOfValues.update(entity, { where: {row_id: entity.row_id }})

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

async function deleteAssetLOVS(req, res, next){
    let entity = req.body

    try{
        let data = await ListOfValues.destroy({ where: {row_id: entity.id }})

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

async function getAttachedAssets(req, res, next){
    let entity = req.query
    console.log("GET ASSETS: ", entity)

    try{
        let data = await ProfileAttribute.findAll({
            where: {
                [Op.and]: [
                    {emp_id: entity.emp_id},
                    {type: 'assets_details'},
                ],
            },
            include: [
                {
                    model: ListOfValues,
                    as: 'function',
                    attributes: ['val'],
                },
            ],
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

async function attachAsset(req, res, next){
    let entity = req.body
    console.log(entity)

    try{
        let data = await ProfileAttribute.create({
           ...entity,
           type: 'assets_details',
        })

        try{
            let data2 = await ProfileAttribute.findOne({ 
                where: { row_id: data.row_id },
                include: [
                    {
                        model: ListOfValues,
                        as: 'function',
                        attributes: ['val'],
                    }
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

async function detachAsset(req, res, next){
    try{
        let data = await ProfileAttribute.destroy({ 
            where: { row_id: req.body.row_id },
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

async function getEligibilityLOVS(req, res, next){
    let entity = req.query
    console.log("ASSET: ", entity)

    try{
        let data = await ListOfValues.findAll({
            where: {
                bu_id: entity.bu_id,
                type: 'eligibility',
            },
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

async function postEligibilityLOVS(req, res, next){
    let entity = req.body
    console.log("POST ASSET: ", entity)

    try{
        let data = await ListOfValues.upsert({
            ...entity,
            type: 'eligibility',
        })
        try{
            let data2 = await ListOfValues.findOne({
                where: { 
                    val: entity.val
                },
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

async function updateEligibilityLOVS(req, res, next){
    let entity = req.body

    try{
        let data = await ListOfValues.update(entity, { where: {row_id: entity.row_id }})

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

async function deleteEligibilityLOVS(req, res, next){
    let entity = req.body

    try{
        let data = await ListOfValues.destroy({ where: {row_id: entity.id }})

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

async function getAttachedEligibilities(req, res, next){
    let entity = req.query
    console.log("GET ELIGIBILITIES: ", entity, entity.emp_id)

    try{
        let data = await ProfileAttribute.findAll({
            where: {
                [Op.and]: [
                    {emp_id: entity.emp_id},
                    {type: 'eligibility_details'},
                ],
            },
            include: [
                {
                    model: ListOfValues,
                    as: 'function',
                    attributes: ['val'],
                },
            ],
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

async function attachEligibility(req, res, next){
    let entity = req.body
    console.log(entity)

    try{
        let data = await ProfileAttribute.create({
           ...entity,
           type: 'eligibility_details',
        })

        try{
            let data2 = await ProfileAttribute.findOne({ 
                where: { row_id: data.row_id },
                include: [
                    {
                        model: ListOfValues,
                        as: 'function',
                        attributes: ['val'],
                    }
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

async function detachEligibility(req, res, next){
    try{
        let data = await ProfileAttribute.destroy({ 
            where: { row_id: req.body.row_id },
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

async function getEmployees(req, res, next){
    let query = req.query
    console.log("GET EMPLOYEES\ndfsdfsd\ndfsdfsd\ndfsdfsd\ndfsdfsd\ndfsdfsd\ndfsdfsd")

    try{
        let data = await Employee.findAll({
            where: query,
            // attributes: ['row_id', 'full_name'],
            include: [
                {
                    model: Division,
                    as: 'division'
                },
                {
                    model: Position,
                    as: 'position_held',
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

async function searchEmployees(req, res, next){
    let search = req.query
    let where

    let tableMapping = {
        bu_id: 'C_BU',
        div_id: 'C_DIV',
        postn_held_id: 'C_POSTN',
        resp_id: 'C_RESP',
    }

    console.log(search)

    if(search.emp_num){
        let tempSQL1 = sequelize.dialect.QueryGenerator.selectQuery('C_EMP', {
            attributes: ['row_id'],
            where: {
                emp_num: {
                    [Op.substring]: search.emp_num,
                }
            }
        }).slice(0,-1)

        where = {
            bu_id: {
                [Op.not]: 1,
            },
            emp_id: {
                [Op.in]: Sequelize.literal(`(${tempSQL1})`)
            },
        }
    }
    else if(search.ATTRIB_01){
        where = {
            bu_id: {
                [Op.not]: 1,
            },
            ATTRIB_01: {
                [Op.substring]: search.ATTRIB_01,
            },
        }
    }
    else if(search.name){
        let query = search.name.split(' ')
        where = {
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
        }
    }
    else if(Object.keys(search).length > 0){
        let keys = Object.keys(search)
        keys.forEach(key => {
            let tempSQL1 = sequelize.dialect.QueryGenerator.selectQuery(tableMapping[key], {
                attributes: ['row_id'],
                where: {
                    name: {
                        [Op.substring]: search[key],
                    }
                }
            }).slice(0,-1)

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
    console.log(where)

    try{
        let data = await User.findAll({
            where,
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
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
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
    }).then(async result => {
        try{
            let data = await User.findAll({
                where: {
                    login: user.login,
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
            err.status = 400
            err.message = `Database Error: ${err}`
            next(err)
        }
    }).catch(err => {
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    });
}

async function deleteEmployee(req, res, next){
    let employee = req.body
    
    try{
        let data = await Employee.destroy({ where: { row_id: employee.row_id }})

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

async function changeEmployeeStatus(req, res, next){
    let checked = req.body.checked
    let employee = req.body.employee
    console.log("ACTIVE METHOD: ", req.body)

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

        let data2 = await ProfileAttribute.findOne({
            where: {
                row_id: data.row_id,
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
            result: data2,
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
                    {type: 'bank_details'},
                    {type: 'assets_details'},
                    {type: 'eligibility_details'},
                ]
            },
            include: [
                {
                    model: ListOfValues,
                    as: 'function',
                    attributes: ['row_id', 'val'],
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
    console.log("Record Upsert: ", Details)

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

async function updateEmployeeDetail(record){
    return new Promise(async (resolve, reject) => {
        try{
            let data = await ProfileAttribute.update(record, { where: { ATTRIB_11: record.ATTRIB_11} })
            console.log("DATA: ", data)
            resolve(data)
        }
        catch(err){
            reject(err)
        }
    })
}

async function updateEmployeeDetails(req, res, next){
    let Details = req.body
    console.log("Record Update: ", Details)

    Promise.all(Details.records.map(record => updateEmployeeDetail(record)))
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

async function searchEmployeeDependants(req, res, next){
    let employee = req.query

    try{
        let data = await ProfileAttribute.findAll({
            where: {
                emp_id: employee.employee,
                type: 'dependant_details'
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

async function addEmployeeDependant(req, res, next){
    let dependant = req.body

    try{
        let data = await ProfileAttribute.create({
            ...dependant,
            type: 'dependant_details',
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

async function deleteEmployeeDependant(req, res, next){
    let dependant = req.body

    try{
        let data = await ProfileAttribute.destroy({
            where: {
                row_id: dependant.row_id
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

async function updateEmployeeDependant(req, res, next){
    let dependant = req.body

    try{
        let data = await ProfileAttribute.update(dependant, { where: {row_id: certificate.row_id }})

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

async function searchEmployeeDesignations(req, res, next){
    let employee = req.query
    console.log("APPLICATION: ", employee)

    try{
        let data = await ProfileAttribute.findAll({
            where: {
                emp_id: employee.employee,
                type: 'designation_details'
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

async function addEmployeeDesignation(req, res, next){
    let designation = req.body

    try{
        let data = await ProfileAttribute.create({
            ...designation,
            ATTRIB_01: designation.ATTRIB_01.value,
            ATTRIB_02: designation.ATTRIB_02.value,
            type: 'designation_details',
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

async function deleteEmployeeDesignation(req, res, next){
    let designation = req.body

    try{
        let data = await ProfileAttribute.destroy({
            where: {
                row_id: designation.row_id
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

async function updateEmployeeDesignation(req, res, next){
    let designation = req.body

    try{
        let data = await ProfileAttribute.update({
            ...designation,
            ATTRIB_01: designation.ATTRIB_01.value,
            ATTRIB_02: designation.ATTRIB_02.value,
        }, { where: {row_id: designation.row_id }})

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

async function searchEmployeeContracts(req, res, next){
    let query = req.body

    try{
        let data = await Employee.findAll({
            where: sequelize.where(sequelize.fn('datediff', sequelize.col('ATTRIB_19'),  sequelize.fn('NOW')), {
                [Op.gt]: 30,
            }),
            order: [
                // 'employee.fst_name',
                ['ATTRIB_19', 'ASC'],
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

async function renewEmployeeContracts(req, res, next){
    let employees = req.body
    console.log(employees)

    try{
        let data = ProfileAttribute.update(
            { ATTRIB_02: 'pending' }, 
            {
                where: {
                    row_id: {
                        [Op.in]:employees
                    }
                }
            }
        )

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

async function deleteEmployeeContracts(req, res, next){
    
}

async function getExpenseNatureLOVS(req, res, next) {
    let entity = req.body
    console.log("POST ASSET: ", entity)

    try {
        let data = await ListOfValues.findAll({
            where: {
                type: 'expense_nature',
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

async function postExpenseNatureLOVS(req, res, next) {
    let entity = req.body
    console.log("POST ASSET: ", entity)

    try {
        let data = await ListOfValues.upsert({
            ...entity,
            type: 'expense_nature',
        })
        try {
            let data2 = await ListOfValues.findOne({
                where: {
                    val: entity.val
                },
            })
            res.status(200).json({
                status: 200,
                result: data2,
                updated: !data,
            })

        }
        catch (err) {
            res.status(200).json({
                status: 200,
                result: data,
            })
        }
    }
    catch (err) {
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function updateExpenseNatureLOVS(req, res, next) {
    let entity = req.body

    try {
        let data = await ListOfValues.update(entity, { where: { row_id: entity.row_id } })

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

async function deleteExpenseNatureLOVS(req, res, next) {
    let entity = req.body

    try {
        let data = await ListOfValues.destroy({ where: { row_id: entity.id } })

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

async function getITTicketTypeLOVS(req, res, next) {
    let entity = req.body
    console.log("POST ASSET: ", entity)

    try {
        let data = await ListOfValues.findAll({
            where: {
                type: 'it-ticket-type',
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

async function postITTicketTypeLOVS(req, res, next) {
    let entity = req.body
    console.log("POST ASSET: ", entity)

    try {
        let data = await ListOfValues.upsert({
            ...entity,
            type: 'it-ticket-type',
        })
        try {
            let data2 = await ListOfValues.findOne({
                where: {
                    val: entity.val
                },
            })
            res.status(200).json({
                status: 200,
                result: data2,
                updated: !data,
            })

        }
        catch (err) {
            res.status(200).json({
                status: 200,
                result: data,
            })
        }
    }
    catch (err) {
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function updateITTicketTypeLOVS(req, res, next) {
    let entity = req.body

    try {
        let data = await ListOfValues.update(entity, { where: { row_id: entity.row_id } })

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

async function deleteITTicketTypeLOVS(req, res, next) {
    let entity = req.body

    try {
        let data = await ListOfValues.destroy({ where: { row_id: entity.id } })

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



async function getHRDocTypeLOVS(req, res, next) {
    let entity = req.body
    console.log("POST ASSET: ", entity)

    try {
        let data = await ListOfValues.findAll({
            where: {
                type: 'hr-doc-type',
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

async function postHRDocTypeLOVS(req, res, next) {
    let entity = req.body
    console.log("POST ASSET: ", entity)

    try {
        let data = await ListOfValues.upsert({
            ...entity,
            type: 'hr-doc-type',
        })
        try {
            let data2 = await ListOfValues.findOne({
                where: {
                    val: entity.val
                },
            })
            res.status(200).json({
                status: 200,
                result: data2,
                updated: !data,
            })

        }
        catch (err) {
            res.status(200).json({
                status: 200,
                result: data,
            })
        }
    }
    catch (err) {
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
}

async function updateHRDocTypeLOVS(req, res, next) {
    let entity = req.body

    try {
        let data = await ListOfValues.update(entity, { where: { row_id: entity.row_id } })

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

async function deleteHRDocTypeLOVS(req, res, next) {
    let entity = req.body

    try {
        let data = await ListOfValues.destroy({ where: { row_id: entity.id } })

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
    getOrganizations,
    postOrganization,
    deleteOrganization,
    getDivisions,
    postDivision,
    deleteDivision,
    getPositions,
    postPosition,
    deletePosition,
    getResponsibilities,
    postResponsibilities,
    updateResponsibilities,
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
    updateNews,
    deleteNews,
    changeNewsStatus,
    getInductionExitLOVS,
    postInductionExitLOVS,
    updateInductionExitLOVS,
    deleteInductionExitLOVS,
    getAssetLOVS,
    postAssetLOVS,
    updateAssetLOVS,
    deleteAssetLOVS,
    getEmployeeAssets,
    getAttachedAssets,
    attachAsset,
    detachAsset,
    getEligibilityLOVS,
    postEligibilityLOVS,
    updateEligibilityLOVS,
    deleteEligibilityLOVS,
    getAttachedEligibilities,
    attachEligibility,
    detachEligibility,
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
    updateEmployeeDetails,
    searchEmployeeDependants,
    addEmployeeDependant,
    deleteEmployeeDependant,
    updateEmployeeDependant,
    searchEmployeeDesignations,
    addEmployeeDesignation,
    deleteEmployeeDesignation,
    updateEmployeeDesignation,
    getEmployees,
    searchEmployees,
    updateEmployee,
    deleteEmployee,
    changeEmployeeStatus,
    searchEmployeeContracts,
    renewEmployeeContracts,
    deleteEmployeeContracts,
    getExpenseNatureLOVS,
    postExpenseNatureLOVS,
    updateExpenseNatureLOVS,
    deleteExpenseNatureLOVS,
    getITTicketTypeLOVS,
    postITTicketTypeLOVS,
    updateITTicketTypeLOVS,
    deleteITTicketTypeLOVS,
    getHRDocTypeLOVS,
    postHRDocTypeLOVS,
    updateHRDocTypeLOVS,
    deleteHRDocTypeLOVS,
}