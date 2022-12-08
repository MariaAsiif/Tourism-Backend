/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').businessOwners

router.post('/createBusinessOwner', permit(['_a', '_bo']), controller.createBusinessOwner)
router.post('/getBusinessOwnersWithFullDetails', permit(['_a', '_bo']), controller.getBusinessOwnersWithFullDetails)
router.post('/updateBusinessOwner', permit(['_a', '_bo']), controller.updateBusinessOwner)
router.post('/removeBusinessOwner', permit(['_a', '_bo']), controller.removeBusinessOwner)
router.post('/getBusinessOwnersList', permit(['_a', '_bo']), controller.getBusinessOwnersList)
router.post('/findBusinessOwnerById', permit(['_a', '_bo']), controller.findBusinessOwnerById)


module.exports = router
