/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').tourPackages

router.post('/createTourPackage', permit(['_a']), controller.createTourPackage)
router.post('/getTourPackagesWithFullDetails', permit(['_a']), controller.getTourPackagesWithFullDetails)
router.post('/updateTourPackage', permit(['_a']), controller.updateTourPackage)
router.post('/removeTourPackage', permit(['_a']), controller.removeTourPackage)
router.post('/getTourPackagesList', permit(['_a']), controller.getTourPackagesList)
router.post('/findTourPackageById', permit(['_a']), controller.findTourPackageById)


module.exports = router
