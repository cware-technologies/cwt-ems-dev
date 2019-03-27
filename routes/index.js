const authRoutes = require('./auth');
const homepageRoutes = require('./homepage');

module.exports = function(app, db) {
    app.use('/auth', authRoutes)
    app.use('/homepage', homepageRoutes)
}