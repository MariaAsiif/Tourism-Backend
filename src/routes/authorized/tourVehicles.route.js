/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').tourVehicles

router.post('/createTourVehicle', permit(['_a', '_bo']), controller.createTourVehicle)
router.post('/getTourVehiclesWithFullDetails', permit(['_a', '_bo']), controller.getTourVehiclesWithFullDetails)
router.post('/updateTourVehicle', permit(['_a', '_bo']), controller.updateTourVehicle)
router.post('/removeTourVehicle', permit(['_a', '_bo']), controller.removeTourVehicle)
router.post('/getTourVehiclesList', permit(['_a', '_bo']), controller.getTourVehiclesList)
router.post('/findTourVehicleById', permit(['_a', '_bo']), controller.findTourVehicleById)


module.exports = router
