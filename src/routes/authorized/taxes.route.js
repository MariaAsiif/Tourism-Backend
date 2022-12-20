/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').taxes

router.post('/createTax', permit(['_a', '_bo']), controller.createTax)
router.post('/getTaxsWithFullDetails', permit(['_a', '_bo']), controller.getTaxsWithFullDetails)
router.post('/updateTax', permit(['_a', '_bo']), controller.updateTax)
router.post('/removeTax', permit(['_a', '_bo']), controller.removeTax)
router.post('/getTaxsList', permit(['_a', '_bo']), controller.getTaxsList)
router.post('/findTaxById', permit(['_a', '_bo']), controller.findTaxById)


module.exports = router
