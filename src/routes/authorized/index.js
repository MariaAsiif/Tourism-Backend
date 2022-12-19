
const express = require('express')
const router = express.Router()

//get defined routes
const usersRoutes = require('./users.route')

const permissionRoutes = require('./permissions.route')
const rolesRoutes = require('./roles.route')
const frontEndModuleRoutes = require('./frontEndModules.route')
const tourCategoriesRoutes = require('./tourCategories.route')
const tourServiceRoutes = require('./tourService.route')
const tourVehicleRoutes = require('./tourVehicles.route')
const hotelRoutes = require('./hotels.route')
const tourPlacesRoutes = require('./tourPlaces.route')
const membershipRoutes = require('./memberships.route')
const discountRoutes = require('./discounts.route')
const tourPackageRoutes = require('./tourPackages.route')
const tourReservationRoutes = require('./tourReservations.route')
const businessOwnerRoutes = require('./businessOwners.route')
const taxRoutes = require('./taxes.route')
const customerRoutes = require('./customers.route')
const invoiceRoutes = require('./invoices.route')
const paymentMethodRoutes = require('./paymentMethods.route')
const galleryAlbumRoutes = require('./galleryAlbums.route')


//call appropriate routes
router.use ('/users', usersRoutes)

router.use ('/permissions', permissionRoutes)
router.use ('/roles', rolesRoutes)
router.use ('/tourCategories', tourCategoriesRoutes)
router.use('/tourServices', tourServiceRoutes)
router.use('/tourVehicles', tourVehicleRoutes)
router.use('/hotels', hotelRoutes)
router.use('/tourPlaces', tourPlacesRoutes)
router.use('/memberships', membershipRoutes)
router.use('/discounts', discountRoutes)
router.use('/tourPackages', tourPackageRoutes)
router.use('/tourReservations', tourReservationRoutes)
router.use('/businessOwners', businessOwnerRoutes)
router.use('/taxes', taxRoutes)
router.use('/customers', customerRoutes)
router.use('/invoices', invoiceRoutes)
router.use('/paymentMethods', paymentMethodRoutes)
router.use('/galleryAlbums', galleryAlbumRoutes)
router.use('/frontEndModules', frontEndModuleRoutes)


module.exports = router
