const passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    JWTStrategy = require('passport-jwt').Strategy,
    ExtractJWT = require('passport-jwt').ExtractJwt,
    bcrypt = require('bcryptjs');

passport.use(
    'login',
    new localStrategy(
        {
        usernameField: 'username',
        passwordField: 'password',
        session: false,
        },
        (username, password, done) => {
        try {
            User.findOne({
            where: {
                username: username,
            },
            }).then(user => {
            if (user === null) {
                return done(null, false, { message: 'bad username' });
            } else {
                bcrypt.compare(password, user.password).then(response => {
                if (response !== true) {
                    console.log('passwords do not match');
                    return done(null, false, { message: 'passwords do not match' });
                }
                console.log('user found & authenticated');
                // note the return needed with passport local - remove this return for passport JWT
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
    secretOrKey: jwtSecret.secret,
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