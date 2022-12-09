
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.set('debug', true);

taxesSchema = new Schema({
    taxName: {
        type: String
    },
    taxPercentage: {
        type: Number
    },
    payStatus: {
        type: String,
        enum: ["filer",
        "nonfiler"]
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


module.exports = mongoose.model('taxes', taxesSchema);
