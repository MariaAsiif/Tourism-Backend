/**
 * Controllers are exported for connecting them with routes
 */
 
module.exports = {
  user: require("./user.controller"),  
  
  permissions: require('./permission.controller'),
  roles: require('./roles.controller')
}
