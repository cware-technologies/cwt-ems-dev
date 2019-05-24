const router = require('express').Router()
const { publicController } = require('../controllers')

router.get('/search/employee', publicController.searchEmployee)

router.get('/employee/hierarchy', publicController.getEmployeeHierarchy)

module.exports = router