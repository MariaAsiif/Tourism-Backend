/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').frontEndModules

router.post('/createFrontEndModule', permit(['_a']), controller.createFrontEndModule)
router.post('/getFrontEndModulesWithFullDetails', permit(['_a']), controller.getFrontEndModulesWithFullDetails)
router.post('/updateFrontEndModule', permit(['_a']), controller.updateFrontEndModule)
router.post('/removeFrontEndModule', permit(['_a']), controller.removeFrontEndModule)
router.post('/getFrontEndModulesList', permit(['_a']), controller.getFrontEndModulesList)
router.post('/findFrontEndModuleById', permit(['_a']), controller.findFrontEndModuleById)


module.exports = router
