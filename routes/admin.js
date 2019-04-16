const router = require('express').Router();
const { adminController } = require('../controllers')

router.get('/org-struct/organization', adminController.getOrganizations)
router.post('/org-struct/organization', adminController.postOrganization)
router.get('/org-struct/division', adminController.getDivisions)
router.post('/org-struct/division', adminController.postDivision)
router.get('/org-struct/position', adminController.getPositions)
router.post('/org-struct/position', adminController.postPosition)
router.get('/org-struct/responsibility', adminController.getResponsibilities)

module.exports = router