/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').hotels

router.post('/createHotel', permit(['_a']), controller.createHotel)
router.post('/getHotelsWithFullDetails', permit(['_a']), controller.getHotelsWithFullDetails)
router.post('/updateHotel', permit(['_a']), controller.updateHotel)
router.post('/removeHotel', permit(['_a']), controller.removeHotel)
router.post('/getHotelsList', permit(['_a']), controller.getHotelsList)
router.post('/findHotelById', permit(['_a']), controller.findHotelById)


module.exports = router
