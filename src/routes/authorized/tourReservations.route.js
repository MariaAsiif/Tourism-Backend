/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').tourReservations

router.post('/createTourReservation', permit(['_a', '_cst']), controller.createTourReservation)
router.post('/getTourReservationsWithFullDetails', permit(['_a', '_cst']), controller.getTourReservationsWithFullDetails)
router.post('/updateTourReservation', permit(['_a', '_cst']), controller.updateTourReservation)
router.post('/removeTourReservation', permit(['_a', '_cst']), controller.removeTourReservation)
router.post('/getTourReservationsList', permit(['_a', '_cst']), controller.getTourReservationsList)
router.post('/findTourReservationById', permit(['_a', '_cst']), controller.findTourReservationById)


module.exports = router
