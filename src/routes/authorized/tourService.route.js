/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').tourService

router.post('/createTourService', permit(['_a']), controller.createTourService)
router.post('/getTourServicesWithFullDetails', permit(['_a']), controller.getTourServicesWithFullDetails)
router.post('/updateTourService', permit(['_a']), controller.updateTourService)
router.post('/removeTourService', permit(['_a']), controller.removeTourService)
router.post('/getTourServicesList', permit(['_a']), controller.getTourServicesList)
router.post('/findTourServiceById', permit(['_a']), controller.findTourServiceById)


module.exports = router
