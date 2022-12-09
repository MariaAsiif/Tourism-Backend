
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.set('debug', true);

customersSchema = new Schema({
    customerName: {
        type: String
      },
      user: {
        type: String,
        ref: 'users'
      },
      invoices: [{
        type: String
      }],
      tourReservations: [{
        type: String
      }],
      memberships: [{
        type: String
      }],
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


module.exports = mongoose.model('customers', customersSchema);
