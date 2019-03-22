const router = require('express').Router();
const { homepageController } = require('../controllers')

router.get('/news', homepageController.getNews);

module.exports = router;