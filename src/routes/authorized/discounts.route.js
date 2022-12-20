/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').discounts

router.post('/createDiscount', permit(['_a', '_bo']), controller.createDiscount)
router.post('/getDiscountsWithFullDetails', permit(['_a', '_bo']), controller.getDiscountsWithFullDetails)
router.post('/updateDiscount', permit(['_a', '_bo']), controller.updateDiscount)
router.post('/removeDiscount', permit(['_a', '_bo']), controller.removeDiscount)
router.post('/getDiscountsList', permit(['_a', '_bo']), controller.getDiscountsList)
router.post('/findDiscountById', permit(['_a', '_bo']), controller.findDiscountById)


module.exports = router
