const router = require('express').Router();
const { homepageController } = require('../controllers')
const passport = require('passport')
const { jwtAuthenticate } = require('../middleware')

router.get('/news', jwtAuthenticate, homepageController.getNews);
router.get('/employee-news', jwtAuthenticate, homepageController.getEmployeeNews);
router.get('/announcements', jwtAuthenticate, homepageController.getAnnouncements);
router.get('/external-feeds', jwtAuthenticate, homepageController.getExternalFeeds);

module.exports = router;