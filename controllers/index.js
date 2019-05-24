const authController = require('./auth');
const homepageController = require('./homepage');
const adminController = require('./admin')
const employeeController = require('./employee')
const publicController = require('./public')
const privateController = require('./private')

module.exports = {
    authController,
    homepageController,
    adminController,
    employeeController,
    publicController,
    privateController,
}