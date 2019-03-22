const router = require('express').Router();
const { authController } = require('../controllers')

router.post('signin', authController.signin);
router.post('register', authController.register);

module.exports = router;