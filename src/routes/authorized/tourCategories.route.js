/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').tourCategories

router.post('/createTourCategories', permit(['_a']), controller.createTourCategories)
router.post('/getTourCategoriesWithFullDetails', permit(['_a']), controller.getTourCategoriesWithFullDetails)
router.post('/updateTourCategories', permit(['_a']), controller.updateTourCategories)
router.post('/removeTourCategories', permit(['_a']), controller.removeTourCategories)
router.post('/getTourCategoriesList', permit(['_a']), controller.getTourCategoriesList)
router.post('/findTourCategoriesById', permit(['_a']), controller.findTourCategoriesById)


module.exports = router
