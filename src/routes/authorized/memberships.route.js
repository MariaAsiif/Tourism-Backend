/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').memberships

router.post('/createMembership', permit(['_a']), controller.createMembership)
router.post('/getMembershipsWithFullDetails', permit(['_a']), controller.getMembershipsWithFullDetails)
router.post('/updateMembership', permit(['_a']), controller.updateMembership)
router.post('/removeMembership', permit(['_a']), controller.removeMembership)
router.post('/getMembershipsList', permit(['_a']), controller.getMembershipsList)
router.post('/findMembershipById', permit(['_a']), controller.findMembershipById)


module.exports = router
