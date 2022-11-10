
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.set('debug', true);

tourPlacesSchema = new Schema({
    tourPlaceName: {
        type: String
      },
      details: {
        type: String
      },
      tourCategory: {
        type: String,
        ref: 'tourCategories'
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


module.exports = mongoose.model('tourPlaces', tourPlacesSchema);
