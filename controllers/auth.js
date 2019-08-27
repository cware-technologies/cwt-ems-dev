const jwt = require('jsonwebtoken'),
    ExtractJWT = require('passport-jwt').ExtractJwt,
    { secret } = require('../config/jwtSecret.json'),
    models = require('../db/models'),
    Users = models.C_USER,
    Employee = models.C_EMP,
    Organization = models.C_BU,
    Division = models.C_DIV,
    Position = models.C_POSTN,
    Responsibility = models.C_RESP,
    ResponsibilityViews = models.C_RESP_VIEW,
    Views = models.C_VIEW,
    Sequelize = require('sequelize')
    Op = Sequelize.Op
    crypto = require('crypto'),
    bcrypt = require('bcryptjs'),
    nodemailer = require('nodemailer')

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
        user_name: req.jwtPayload.name,
        redirectURL: '/portal/'
    });
}

async function register(req, res, next) {
    console.log("\n\n\n" + req.currentUsername + "\n\n\n")
    try{
        let data = await Users.findAll({
            where: {
                login: req.currentUsername,
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
            message: 'User Created Successfully',
            data: data[0],
        });
    }
    catch(err){
        console.log(err)
        err.status = 400
        err.message = `Database Error: ${err}`
        next(err)
    }
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

async function postResetPassword(req, res, next) {
    let details = req.body
    const token = crypto.randomBytes(20).toString('hex');

    try {
        let data = await Users.update(
            {
                ATTRIB_01: token,
                ATTRIB_02: Date.now() + 6000
            },
            {
                where:
                {
                    login: details.email
                }
            }
        )
        res.status(200).json({
            status: 200,
            data,
        })

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'aown@cwaret.com',
                pass: 'password123',
            },
        });
    
        const mailOptions = {
            from: 'aown@cwaret.com',
            to: details.email,
            subject: 'Link To Reset Password',
            text:
                'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
                + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
                + `http://localhost:3000/password-new/${token}\n\n`
                + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
        };
    
        console.log('sending mail');
    
        transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
                console.error('there was an error: ', err);
            } else {
                console.log('here is the res: ', response);
                res.status(200).json('recovery email sent');
            }
        });
    
    }
    catch (err) {
        err.status = 400
        err.message = `Database Error..: ${err}`
        next(err)
    }
}

async function getResetPassword(req, res, next) {
    let details = req.body
    try{
        let data = await Users.findOne(
            {
                where:
                {
                    ATTRIB_01: details.resetPasswordToken
                }
            }
        )
        res.status(200).json({
            status: 200,
            data,
        })
    
    }
    catch (err) {
        err.status = 400
        err.message = `Database Error..: ${err}`
        next(err)
    }
}

async function updateResetPassword(req, res, next) {
    let details = req.body
   let pass = await bcrypt.hash(details.password, 12)

   console.log("server pass   ",pass)
   

    try{
        let data = await Users.update(
            {
                hash_pwd: pass
            },
            {  
                where:
                {
                    ATTRIB_01: details.token,
                    
                }
            }
        )
        res.status(200).json({
            status: 200,
            data,
        })
    
    }
    catch (err) {
        err.status = 400
        err.message = `Database Error..: ${err}`
        next(err)
    }
}

module.exports = {
    signin,
    register,
    getResponsibilityViews,
    verifyToken,
    postResetPassword,
    getResetPassword,
    updateResetPassword,
}