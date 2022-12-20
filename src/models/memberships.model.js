
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.set('debug', true);

membershipsSchema = new Schema({
    membershipName: {
        type: String
    },
    currentPoints: {
        type: Number
    },
    membStartDate: {
        type: Date
    },
    membEndDate: {
        type: Date
    },
    nextRenewalDate: {
        type: Date
    },
    active: {
        type: Boolean
    },
    feePaid: {
        type: Boolean
    },
    membershipType: {
        type: String
    },
    customer: {
        type: String,
        ref: 'customers'
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


module.exports = mongoose.model('memberships', membershipsSchema);
