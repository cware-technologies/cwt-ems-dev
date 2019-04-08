const passport = require('passport')

module.exports = function (req, res, next) {
    passport.authenticate('jwt', function (err, user, info) {
        if (err) {
            err.status = 401
            err.redirectURL = '/signin'
            return next(err)
        }
        else if ( info !== undefined ){
            info.status = 401
            info.redirectURL = '/signin'
            return next(info)
        }
        else if (!user) {
            info.status = 401
            info.redirectURL = '/signin'
            return next(err)
        }
        else if (user)
            next()
        // next()
    })(req, res, next);
    // passport.authenticate('jwt', { failWithError: true, session: false, }),
    //     function (req, res, next) {
    //         console.log("HIIIIIIIIIIIIIIII")
    //         next()
    //     },
    //     function (err, req, res, next) {
    //         console.log("BYYYYEEEEEEEEEEEE")
    //         if (req.errorMessage) {
    //             let err = req.errorMessage;
    //             return next(err);
    //         }
    //         return next(err);
    //     }
}