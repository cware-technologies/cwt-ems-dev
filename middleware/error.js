module.exports = function(err, req, res, next) {
    res.json({
        status: err.status,
        message: err.message,
    })
}