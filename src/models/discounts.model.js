
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.set('debug', true);

discountsSchema = new Schema({
    discountNumber: {
        type: Number
    },
    discountName: {
        type: String
    },
    offer: {
        type: String
    },
    discountPercentage: {
        type: Number
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


module.exports = mongoose.model('discounts', discountsSchema);
