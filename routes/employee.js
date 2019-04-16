const router = require('express').Router();
const { employeeController } = require('../controllers')

router.get('/employee', employeeController.getEmployees);

module.exports = router