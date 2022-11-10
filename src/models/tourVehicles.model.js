
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.set('debug', true);

tourVehiclesSchema = new Schema({
    vehicleMade: {
        type: String
      },
      seatingCapacity: {
        type: String
      },
      vehicleType: {
        type: String
      },
      available: {
        type: Boolean,
        defualt: true
      },
      notAvailabilityReason: {
        type: String
      },
    
    addedby: {
        type: String,
        ref: 'users'
    },
    
    lastModifiedBy: {
        type: String,
        ref: 'users'
    },
    active: {
        type: Boolean,
        default: true
    }
},
{
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    usePushEach: true
})


module.exports = mongoose.model('tourVehicles', tourVehiclesSchema);
