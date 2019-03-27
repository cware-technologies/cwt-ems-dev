const passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    JWTstrategy = require('passport-jwt').Strategy,
    ExtractJWT = require('passport-jwt').ExtractJwt,
    models = require('../db/models'),
    Employee = models.Employee,
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
            try{
                debug(Employee)
                Employee.findOne({
                    where: {
                        email: username,
                    },
                }).then(user => {
                    if(user !== null){
                        debug('Username Already Taken');
                        return done(null, false, { message: 'username already taken' });
                    }
                    else {
                        bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
                            console.log(username, hashedPassword)
                            Employee.create({email: username, password: hashedPassword}).then(user => {
                                debug("User Created");
                                return done(null, user)
                            })
                        })
                    }
                })
            }
            catch(err){
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
            Employee.findOne({
            where: {
                email: username,
            },
            }).then(user => {
            if (user === null) {
                let err = new Error('Username Or Password Is Wrong.')
                err.status = 401
                req.errorMessage = err
                return done(null, false, { message: 'Username Or Password Is Wrong.' });
            } else {
                bcrypt.compare(password, user.password).then(response => {
                    if (response !== true) {
                        let err = new Error('Username Or Password Is Wrong.')
                        err.status = 401
                        req.errorMessage = err
                        return done(null, false, { message: 'Username Or Password Is Wrong.' });
                    }
                    // note the return needed with passport local - remove this return for passport JWT
                    req.jwtPayload = {
                        id: user.id,
                        name: user.email,
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
    new JWTstrategy(opts, (jwt_payload, done) => {
        try {
        User.findOne({
            where: {
            username: jwt_payload.id,
            },
        }).then(user => {
            if (user) {
            console.log('user found in db in passport');
            // note the return removed with passport JWT - add this return for passport local
            done(null, user);
            } else {
            console.log('user not found in db');
            done(null, false);
            }
        });
        } catch (err) {
        done(err);
        }
    }),
);