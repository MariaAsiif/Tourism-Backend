/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').invoices

router.post('/createInvoice', permit(['_a']), controller.createInvoice)
router.post('/getInvoicesWithFullDetails', permit(['_a']), controller.getInvoicesWithFullDetails)
router.post('/updateInvoice', permit(['_a']), controller.updateInvoice)
router.post('/removeInvoice', permit(['_a']), controller.removeInvoice)
router.post('/getInvoicesList', permit(['_a']), controller.getInvoicesList)
router.post('/findInvoiceById', permit(['_a']), controller.findInvoiceById)


module.exports = router
