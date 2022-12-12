/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').paymentMethods

router.post('/createPaymentMethod', permit(['_a']), controller.createPaymentMethod)
router.post('/getPaymentMethodsWithFullDetails', permit(['_a']), controller.getPaymentMethodsWithFullDetails)
router.post('/updatePaymentMethod', permit(['_a']), controller.updatePaymentMethod)
router.post('/removePaymentMethod', permit(['_a']), controller.removePaymentMethod)
router.post('/getPaymentMethodsList', permit(['_a']), controller.getPaymentMethodsList)
router.post('/findPaymentMethodById', permit(['_a']), controller.findPaymentMethodById)


module.exports = router
