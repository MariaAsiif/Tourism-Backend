
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.set('debug', true);

paymentMethodsSchema = new Schema({
    paymentMethodName: {
        type: String
    },
    logoFileUrl: {
        type: String
    },
    details: {
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


module.exports = mongoose.model('paymentMethods', paymentMethodsSchema);
