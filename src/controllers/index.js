/**
 * Controllers are exported for connecting them with routes
 */
 
module.exports = {
  user: require("./user.controller"),  
  
  permissions: require('./permission.controller'),
  roles: require('./roles.controller'),
  tourCategories: require('./tourCategories.controller'),
  tourService: require('./tourService.controller'),
  tourVehicles: require('./tourVehicle.controller'),
  hotels: require('./hotels.controller'),
  tourPlaces: require('./tourPlaces.controller'),
  memberships: require('./memberships.controller'),
  discounts: require('./discounts.controller')
}
