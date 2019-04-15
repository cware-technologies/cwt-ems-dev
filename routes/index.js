const authRoutes = require('./auth');
const homepageRoutes = require('./homepage');
const adminRoutes = require('./admin')

module.exports = function(app, db) {
    app.use('/auth', authRoutes)
    app.use('/homepage', homepageRoutes)
    app.use('/admin', adminRoutes)
}