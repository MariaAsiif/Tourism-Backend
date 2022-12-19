/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').tourCategories

router.post('/createTourCategories', permit(['_a', '_bo']), controller.createTourCategories)
router.post('/getTourCategoriesWithFullDetails', permit(['_a', '_bo']), controller.getTourCategoriesWithFullDetails)
router.post('/updateTourCategories', permit(['_a', '_bo']), controller.updateTourCategories)
router.post('/removeTourCategories', permit(['_a', '_bo']), controller.removeTourCategories)
router.post('/getTourCategoriesList', permit(['_a', '_bo']), controller.getTourCategoriesList)
router.post('/findTourCategoriesById', permit(['_a', '_bo']), controller.findTourCategoriesById)


module.exports = router
