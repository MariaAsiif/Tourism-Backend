/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').discounts

router.post('/createDiscount', permit(['_a']), controller.createDiscount)
router.post('/getDiscountsWithFullDetails', permit(['_a']), controller.getDiscountsWithFullDetails)
router.post('/updateDiscount', permit(['_a']), controller.updateDiscount)
router.post('/removeDiscount', permit(['_a']), controller.removeDiscount)
router.post('/getDiscountsList', permit(['_a']), controller.getDiscountsList)
router.post('/findDiscountById', permit(['_a']), controller.findDiscountById)


module.exports = router
