const router = require('express').Router();
const { adminController } = require('../controllers')
var multer = require('multer')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/documents')
    },
    filename: (req, file, cb) => {
        var fileExtension = file.originalname.split('.')
        cb(null, `${file.fieldname}-${Date.now()}.${fileExtension[fileExtension.length - 1]}`);
    }
});

var upload = multer({ storage: storage });

router.get('/org-struct/organization', adminController.getOrganizations)
router.post('/org-struct/organization', adminController.postOrganization)

router.get('/org-struct/division', adminController.getDivisions)
router.post('/org-struct/division', adminController.postDivision)

router.get('/org-struct/position', adminController.getPositions)
router.post('/org-struct/position', adminController.postPosition)

router.get('/org-struct/responsibility', adminController.getResponsibilities)
router.post('/org-struct/responsibility', adminController.postResponsibilities)

router.get('/access-rights/view', adminController.getViews)
router.post('/access-rights/view', adminController.postView)


router.post('/access-rights/responsibility-view', adminController.postResponsibilityView)
router.get('/access-rights/responsibility-view', adminController.getResponsibilityViews)
router.put('/access-rights/responsibility-view', adminController.updateResponsibilityView)


router.get('/hr-docs', adminController.getHRDocs)
router.delete('/hr-docs', adminController.deleteHRDocs)
router.get('/hr-docs/download', adminController.downloadHRDoc)
router.post('/hr-docs/upload', upload.single('file'), adminController.uploadHRDoc)

router.post('/post', adminController.postNews)

router.get('/induction-lovs', adminController.getInductionExitLOVS)
router.post('/induction-lovs', adminController.postInductionExitLOVS)
router.put('/induction-lovs', adminController.updateInductionExitLOVS)
router.delete('/induction-lovs', adminController.deleteInductionExitLOVS)

router.get('/application/induction-exit', adminController.getInductionExit)
router.post('/application/induction-exit', adminController.applyForInductionExit)
router.put('/application/induction-exit', adminController.updateInductionExit)

router.post('/application/leave-type', adminController.applyForEntitlement)

router.get('/leave-types', adminController.getLeaveTypeLOVS)
router.post('/leave-types', adminController.postLeaveTypeLOVS)
router.put('/leave-types', adminController.updateLeaveTypeLOVS)
router.delete('/leave-types', adminController.deleteLeaveTypeLOVS)

router.get('/employee/entitlements', adminController.getEmployeeEntitlements)
router.delete('/employee/entitlements', adminController.deleteEmployeeEntitlements)

router.get('/employee/details', adminController.searchEmployeeDetails)
router.post('/employee/details', adminController.upsertEmployeeDetails)

module.exports = router