
const express = require('express')
const router = express.Router()

//get defined routes
const usersRoutes = require('./users.route')

const permissionRoutes = require('./permissions.route')
const rolesRoutes = require('./roles.route')



//call appropriate routes
router.use ('/users', usersRoutes)

router.use ('/permissions', permissionRoutes)
router.use ('/roles', rolesRoutes)


module.exports = router
