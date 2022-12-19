
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.set('debug', true);

frontEndModulesSchema = new Schema({
    frontEndModuleName: {
        type: String
    },
    modulePlateform: {
        type: String,
        enum: ['mobile', 'web'],
        default: 'web'
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


module.exports = mongoose.model('frontEndModules', frontEndModulesSchema);
