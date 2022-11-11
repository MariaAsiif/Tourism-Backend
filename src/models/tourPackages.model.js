
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.set('debug', true);

tourPackagesSchema = new Schema({
    tourPackageNumber: {
        type: Number
    },
    tourPackageName: {
        type: String
    },
    tourCategory: {
        type: String,
        ref: 'tourCategories'
    },
    departureTime: {
        type: Date
    },
    departurePlaces: [{
        type: String,
        ref: 'tourPlaces'
    }],
    arrivalTime: {
        type: Date
    },
    arrivalPlaces: [{
        type: String,
        ref: 'tourPlaces'
    }],
    placesToVisit: [{
        type: String,
        ref: 'tourPlaces'
    }],
    registrationOpenDate: {
        type: Date
    },
    registerationClosingDate: {
        type: Date
    },
    hotels: [{
        type: String,
        ref: 'hotels'
    }],
    additionalServices: [{
        type: String,
        ref: 'tourServices'
    }],
    tourVehicles: [{
        type: String,
        ref: 'tourVehicles'
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


module.exports = mongoose.model('tourPackages', tourPackagesSchema);
