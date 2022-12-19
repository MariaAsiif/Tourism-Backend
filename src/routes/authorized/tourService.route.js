/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').tourService

router.post('/createTourService', permit(['_a', '_bo']), controller.createTourService)
router.post('/getTourServicesWithFullDetails', permit(['_a', '_bo']), controller.getTourServicesWithFullDetails)
router.post('/updateTourService', permit(['_a', '_bo']), controller.updateTourService)
router.post('/removeTourService', permit(['_a', '_bo']), controller.removeTourService)
router.post('/getTourServicesList', permit(['_a', '_bo']), controller.getTourServicesList)
router.post('/findTourServiceById', permit(['_a', '_bo']), controller.findTourServiceById)


module.exports = router
