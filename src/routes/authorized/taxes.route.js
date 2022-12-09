/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').taxes

router.post('/createTax', permit(['_a']), controller.createTax)
router.post('/getTaxsWithFullDetails', permit(['_a']), controller.getTaxsWithFullDetails)
router.post('/updateTax', permit(['_a']), controller.updateTax)
router.post('/removeTax', permit(['_a']), controller.removeTax)
router.post('/getTaxsList', permit(['_a']), controller.getTaxsList)
router.post('/findTaxById', permit(['_a']), controller.findTaxById)


module.exports = router
