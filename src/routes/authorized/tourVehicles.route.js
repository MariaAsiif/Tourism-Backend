/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').tourVehicles

router.post('/createTourVehicle', permit(['_a']), controller.createTourVehicle)
router.post('/getTourVehiclesWithFullDetails', permit(['_a']), controller.getTourVehiclesWithFullDetails)
router.post('/updateTourVehicle', permit(['_a']), controller.updateTourVehicle)
router.post('/removeTourVehicle', permit(['_a']), controller.removeTourVehicle)
router.post('/getTourVehiclesList', permit(['_a']), controller.getTourVehiclesList)
router.post('/findTourVehicleById', permit(['_a']), controller.findTourVehicleById)


module.exports = router
