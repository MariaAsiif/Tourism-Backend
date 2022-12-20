/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').memberships

router.post('/createMembership', permit(['_a', '_bo']), controller.createMembership)
router.post('/getMembershipsWithFullDetails', permit(['_a', '_bo']), controller.getMembershipsWithFullDetails)
router.post('/updateMembership', permit(['_a', '_bo']), controller.updateMembership)
router.post('/removeMembership', permit(['_a', '_bo']), controller.removeMembership)
router.post('/getMembershipsList', permit(['_a', '_bo']), controller.getMembershipsList)
router.post('/findMembershipById', permit(['_a', '_bo']), controller.findMembershipById)


module.exports = router
