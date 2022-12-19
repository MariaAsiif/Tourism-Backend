/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').tourPlaces

router.post('/createTourPlace', permit(['_a', '_bo']), controller.createTourPlace)
router.post('/getTourPlacesWithFullDetails', permit(['_a', '_bo']), controller.getTourPlacesWithFullDetails)
router.post('/updateTourPlace', permit(['_a', '_bo']), controller.updateTourPlace)
router.post('/removeTourPlace', permit(['_a', '_bo']), controller.removeTourPlace)
router.post('/getTourPlacesList', permit(['_a', '_bo']), controller.getTourPlacesList)
router.post('/findTourPlaceById', permit(['_a', '_bo']), controller.findTourPlaceById)


module.exports = router
