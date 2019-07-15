const router = require('express').Router();
const { adminController } = require('../controllers')

router.get('/org-struct/organization', adminController.getOrganizations)
router.post('/org-struct/organization', adminController.postOrganization)
router.delete('/org-struct/organization', adminController.deleteOrganization)

router.get('/org-struct/division', adminController.getDivisions)
router.post('/org-struct/division', adminController.postDivision)
router.delete('/org-struct/division', adminController.deleteDivision)

router.get('/org-struct/position', adminController.getPositions)
router.post('/org-struct/position', adminController.postPosition)
router.delete('/org-struct/position', adminController.deletePosition)

router.get('/org-struct/responsibility', adminController.getResponsibilities)
router.post('/org-struct/responsibility', adminController.postResponsibilities)
router.put('/org-struct/responsibility', adminController.updateResponsibilities)

router.get('/access-rights/view', adminController.getViews)
router.post('/access-rights/view', adminController.postView)

router.get('/access-rights/responsibility-view', adminController.getResponsibilityViews)
router.post('/access-rights/responsibility-view', adminController.postResponsibilityView)
router.put('/access-rights/responsibility-view', adminController.updateResponsibilityView)
router.delete('/access-rights/responsibility-view', adminController.deleteResponsibilityView)


router.get('/hr-docs', adminController.getHRDocs)
router.delete('/hr-docs', adminController.deleteHRDocs)
router.get('/hr-docs/download', adminController.downloadHRDoc)
router.post('/hr-docs/upload', adminController.uploadHRDoc)

router.post('/news', adminController.postNews)
router.put('/news', adminController.updateNews)
router.delete('/news', adminController.deleteNews);
router.post('/news/changeStatus', adminController.changeNewsStatus)

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

router.get('/employees', adminController.getEmployees)
router.put('/employees', adminController.updateEmployee)
router.delete('/employees', adminController.deleteEmployee)

router.post('/employees/changeStatus', adminController.changeEmployeeStatus)



module.exports = router