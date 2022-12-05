/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').tourReservations

router.post('/createTourReservation', permit(['_a']), controller.createTourReservation)
router.post('/getTourReservationsWithFullDetails', permit(['_a']), controller.getTourReservationsWithFullDetails)
router.post('/updateTourReservation', permit(['_a']), controller.updateTourReservation)
router.post('/removeTourReservation', permit(['_a']), controller.removeTourReservation)
router.post('/getTourReservationsList', permit(['_a']), controller.getTourReservationsList)
router.post('/findTourReservationById', permit(['_a']), controller.findTourReservationById)


module.exports = router
