const authRoutes = require('./auth');
const homepageRoutes = require('./homepage');
const adminRoutes = require('./admin')
const employeeRoutes = require('./employee')
const publicRoutes = require('./public')
const privateRoutes = require('./private')

module.exports = function(app, db) {
    app.use('/auth', authRoutes)
    app.use('/homepage', homepageRoutes)
    app.use('/admin', adminRoutes)
    app.use('/public', publicRoutes)
    app.use('/employee', employeeRoutes)
    app.use('/private', privateRoutes)
}