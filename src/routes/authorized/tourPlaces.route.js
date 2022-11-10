/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').tourPlaces

router.post('/createTourPlace', permit(['_a']), controller.createTourPlace)
router.post('/getTourPlacesWithFullDetails', permit(['_a']), controller.getTourPlacesWithFullDetails)
router.post('/updateTourPlace', permit(['_a']), controller.updateTourPlace)
router.post('/removeTourPlace', permit(['_a']), controller.removeTourPlace)
router.post('/getTourPlacesList', permit(['_a']), controller.getTourPlacesList)
router.post('/findTourPlaceById', permit(['_a']), controller.findTourPlaceById)


module.exports = router
