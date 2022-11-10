
const express = require('express')
const router = express.Router()

//get defined routes
const usersRoutes = require('./users.route')

const permissionRoutes = require('./permissions.route')
const rolesRoutes = require('./roles.route')
const tourCategoriesRoutes = require('./tourCategories.route')
const tourServiceRoutes = require('./tourService.route')
const tourVehicleRoutes = require('./tourVehicles.route')
const hotelRoutes = require('./hotels.route')
const tourPlacesRoutes = require('./tourPlaces.route')



//call appropriate routes
router.use ('/users', usersRoutes)

router.use ('/permissions', permissionRoutes)
router.use ('/roles', rolesRoutes)
router.use ('/tourCategories', tourCategoriesRoutes)
router.use('/tourServices', tourServiceRoutes)
router.use('/tourVehicles', tourVehicleRoutes)
router.use('/hotels', hotelRoutes)
router.use('/tourPlaces', tourPlacesRoutes)


module.exports = router
