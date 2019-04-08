module.exports = function(err, req, res, next) {

    // if(err.redirectURL){
    //     res.redirect(`${err.redirectURL}`);
    // }

    res.json({
        status: err.status,
        message: err.message,
    })
}