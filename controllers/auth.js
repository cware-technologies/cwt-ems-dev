const jwt = require('jsonwebtoken'),
    ExtractJWT = require('passport-jwt').ExtractJwt,
    { secret } = require('../config/jwtSecret.json'),
    models = require('../db/models'),
    ResponsibilityViews = models.C_RESP_VIEW,
    Views = models.C_VIEW,
    Sequelize = require('sequelize')
    Op = Sequelize.Op

async function signin(req, res, next) {
    // let views = await getResponsibilityViews(req, res, next)

    const token = jwt.sign(req.jwtPayload, secret, { expiresIn: '1d' })
    res.status(200).json({
        status: 200,
        message: 'Authentication Successful',
        token,
        responsibility: req.jwtPayload.responsibility,
        organization: req.jwtPayload.organization,
        user_id: req.jwtPayload.id,
        redirectURL: '/portal/'
    });
}

function register(req, res, next) {
    res.status(200).json({
        status: 200,
        message: 'User Created Successfully',
    });
}

function verifyToken(req, res, next){
    let jwtSecret = secret
    let token = ExtractJWT.fromAuthHeaderAsBearerToken()(req)

    jwt.verify(token, jwtSecret, function(err, decoded) {
        if(err){
            res.status(200).json({
                status: 404,
                redirectURL: "/signin"
            })
            // err.status = 400
            // err.redirectURL = "/signin"
            // next(err)
        }
        else(
            res.status(200).json({
                status: 200,
                message: "User Verified Successfuly",
                redirectURL: "/portal/dashboard",
            })
        )
    });
}

async function getResponsibilityViews(req, res, next) {
    let responsibility = /* req.jwtPayload ? req.jwtPayload.responsibility :  */req.query.resp_id

    try{
        let data = await ResponsibilityViews.findAll({
            where: {
                // [Op.or]: [{authorId: 12}, {authorId: 13}],
                resp_id: responsibility,
            },
            attributes: ['FLG_01', 'FLG_02'],
            include: [
                {
                    model: Views,
                    as: 'view',
                },
            ]
        }).map(el => el.get({ plain: true }))

        let result = data.map(view => ({
            ...view.view,
            readOnly: view.FLG_01,
            write: view.FLG_02
        }))

        res.status(200).json({
            status: 200,
            views: result,
        })
    }
    catch(err){
        next(err)
    }
}

module.exports = {
    signin,
    register,
    getResponsibilityViews,
    verifyToken,
}