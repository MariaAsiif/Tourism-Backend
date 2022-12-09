
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.set('debug', true);

invoicesSchema = new Schema({
    invoiceNumber: {
        type: Number
    },
    customer: {
        type: String,
        ref: 'customers'
    },
    tourReservation: {
        type: String,
        ref: 'tourReservations'
    },
    amount: {
        type: Number
    },
    discount: {
        type: String,
        ref: 'discounts'
    },
    tax: {
        type: String,
        ref: 'taxes'
    },
    invoiceStatus: {
        type: String,
        enum: ["due", "paid"]
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


module.exports = mongoose.model('invoices', invoicesSchema);
