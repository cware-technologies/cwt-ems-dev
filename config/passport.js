const passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    JWTStrategy = require('passport-jwt').Strategy,
    ExtractJWT = require('passport-jwt').ExtractJwt,
    Sequelize = require('sequelize'),
    models = require('../db/models'),
    Employee = models.C_EMP,
    User = models.C_USER,
    bcrypt = require('bcryptjs'),
    debug = require('debug')('passport'),
    { secret } = require('../config/jwtSecret.json');

const BCRYPT_SALT_ROUNDS = 12;

passport.use(
    'register',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
            session: false,
        },
        (req, username, password, done) => {
            try {
                User.findOne({
                    where: {
                        login: username,
                    },
                }).then(user => {
                    if (user !== null) {
                        let err = new Error('Username already taken')
                        err.status = 401
                        req.errorMessage = err
                        return done(null, false, { message: 'Username already taken' });
                    }
                    else {
                        let user = req.body
                        bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
                            console.log(username, hashedPassword)
                            console.log(user)
                            Employee.create({
                                emp_num: user.empNum,
                                fst_name: user.firstName,
                                last_name: user.lastName,
                                bu_id: user.organization,
                                div_id: user.division,
                                postn_held_id: user.position,
                                resp_id: user.responsibility,
                                report_to_id: user.reportsTo,
                            }).then(emp => {
                                User.create({
                                    login: username,
                                    hash_pwd: hashedPassword,
                                    emp_id: emp.row_id,
                                    resp_id: user.responsibility,
                                    fst_name: user.firstName,
                                    last_name: user.lastName,
                                }).then(user => {
                                    debug("User Created");
                                    return done(null, user)
                                })
                            })   
                        })
                    }
                })
            }
            catch (err) {
                done(err);
            }
        }
    )
)
passport.use(
    'signin',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
            session: false,
        },
        (req, username, password, done) => {
            try {
                User.findOne({
                    where: {
                        login: username,
                    },
                }).then(user => {
                    if (user === null) {
                        let err = new Error('Username Or Password Is Wrong.')
                        err.status = 401
                        req.errorMessage = err
                        return done(null, false, { message: 'Username Or Password Is Wrong.' });
                    } else {
                        bcrypt.compare(password, user.hash_pwd).then(response => {
                            if (response !== true) {
                                let err = new Error('Username Or Password Is Wrong.')
                                err.status = 401
                                req.errorMessage = err
                                return done(null, false, { message: 'Username Or Password Is Wrong.' });
                            }
                            // note the return needed with passport local - remove this return for passport JWT
                            req.jwtPayload = {
                                id: user.row_id,
                                username: user.login,
                            }

                            return done(null, user);

                        });
                    }
                });
            } catch (err) {
                done(err);
            }
        },
    ),
);

const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret,
};

passport.use(
    'jwt',
    new JWTStrategy(opts, (jwt_payload, done) => {
        try {
            User.findOne({
                where: {
                    login: jwt_payload.username,
                },
            }).then(user => {
                if (user) {
                    console.log('user found in db in passport');
                    // note the return removed with passport JWT - add this return for passport local
                    return done(null, user);
                } else {
                    console.log('user not found in db');
                    let err = new Error('Sign in Again')
                    err.status = 401
                    return done(null, false, err);
                }
            });
        } catch (err) {
            return done(err);
        }
    }),
);