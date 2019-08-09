const router = require('express').Router()
const { privateController } = require('../controllers')

// router.get('/search/employee', publicController.searchEmployee)

router.get('/employee/details', privateController.searchEmployeeDetails)
router.get('/employee', privateController.getEmployee)
router.post('/employee/details', privateController.upsertEmployeeDetails)

router.put('/employee/personal-details', privateController.updateEmployeePersonalDetails)

router.get('/employee/details/certifications', privateController.searchEmployeeCertifications)
router.post('/employee/details/certifications', privateController.addEmployeeCertification)
router.delete('/employee/details/certifications', privateController.deleteEmployeeCertification)
router.put('/employee/details/certifications', privateController.updateEmployeeCertification)

router.get('/employee/details/skills', privateController.searchEmployeeSkills)
router.post('/employee/details/skills', privateController.addEmployeeSkill)
router.delete('/employee/details/skills', privateController.deleteEmployeeSkill)
router.put('/employee/details/skills', privateController.updateEmployeeSkill)

router.get('/employee/details/professionalAttributes', privateController.searchEmployeeProfessionalAttributes)
router.post('/employee/details/professionalAttributes', privateController.addEmployeeProfessionalAttribute)
router.delete('/employee/details/professionalAttributes', privateController.deleteEmployeeProfessionalAttribute)
router.put('/employee/details/professionalAttributes', privateController.updateEmployeeProfessionalAttribute)

router.get('/employee/contracts', privateController.getContracts)
router.get('/employee/contracts/accept', privateController.acceptContract)
router.get('/employee/contracts/reject', privateController.rejectContract)

router.get('/employee/leaves', privateController.getLeaves)
router.post('/employee/leave/request', privateController.postLeaveRequest)
router.delete('/employee/leaves', privateController.withdrawLeave)
router.get('/employee/leave/requestedLeaves', privateController.getRequestedLeaves)
router.put('/employee/leave/updateLeaveRequested', privateController.updateLeaveRequested)
router.get('/employee/entitlements/history', privateController.getEntitlementsData)
router.get('/employee/entitlements', privateController.getEmployeeEntitlements)

module.exports = router