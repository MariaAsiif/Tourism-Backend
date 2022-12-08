/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').tourPackages

router.post('/createTourPackage', permit(['_a', '_bo']), controller.createTourPackage)
router.post('/getTourPackagesWithFullDetails', permit(['_a', '_bo']), controller.getTourPackagesWithFullDetails)
router.post('/updateTourPackage', permit(['_a', '_bo']), controller.updateTourPackage)
router.post('/removeTourPackage', permit(['_a', '_bo']), controller.removeTourPackage)
router.post('/getTourPackagesList', permit(['_a', '_bo']), controller.getTourPackagesList)
router.post('/findTourPackageById', permit(['_a', '_bo']), controller.findTourPackageById)


module.exports = router
