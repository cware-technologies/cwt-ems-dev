const router = require('express').Router()
const { publicController } = require('../controllers')

router.get('/search/employee', publicController.searchEmployee)

module.exports = router