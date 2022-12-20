/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').hotels

router.post('/createHotel', permit(['_a', '_bo']), controller.createHotel)
router.post('/getHotelsWithFullDetails', permit(['_a', '_bo']), controller.getHotelsWithFullDetails)
router.post('/updateHotel', permit(['_a', '_bo']), controller.updateHotel)
router.post('/removeHotel', permit(['_a', '_bo']), controller.removeHotel)
router.post('/getHotelsList', permit(['_a', '_bo']), controller.getHotelsList)
router.post('/findHotelById', permit(['_a', '_bo']), controller.findHotelById)


module.exports = router
