
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.set('debug', true);

tourReservationsSchema = new Schema({
    customer: {
        type: String,
        ref: 'users'
    },
    tourPackages: {
        type: String,
        ref: 'tourPackages'
    },
    reservationDate: {
        type: Date
    },
    paymentMade: {
        type: Number
    },
    isPaymentMade: {
        type: Boolean
    },
    discount: {
        type: String,
        ref: 'discounts'
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


module.exports = mongoose.model('tourReservations', tourReservationsSchema);
