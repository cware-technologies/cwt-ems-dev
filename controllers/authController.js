const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwtSecret.json');

function signin(req, res, next) {
    const token = jwt.sign(req.jwtPayload, secret)
    res.status(200).json({
        status: 200,
        message: 'Authentication Successful',
        token,
        redirectURL: '/portal/'
    });
}

function register(req, res, next) {
    res.status(200).json({
        status: 200,
        message: 'User Created Successfully',
    });
}

module.exports = {
    signin,
    register,
}