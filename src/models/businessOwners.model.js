
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.set('debug', true);

businessOwnersSchema = new Schema({
  businessName: {
    type: String,
    required: true
  },
  businessOwnerName: {
    type: String
  },
  businessAddress: {
    type: String
  },
  businessType: {
    type: String
  },
  startDate: {
    type: Date
  },
  businessOwner: {
    type: String,
    ref: 'users'
  },
  feePayable: {
    type: String
  },
  tourReservations: [{
    type: String,
    ref: 'tourReservations'
  }],
  tourPackages: [{
    type: String,
    ref: 'tourPackages'
  }],
  hotels: [{
    type: String,
    ref: 'hotels'
  }],
  tourVehicles: [{
    type: String,
    ref: 'tourVehicles'
  }],
  tourPlaces: [{
    type: String,
    ref: 'tourPlaces'
  }],
  additionalServices: [{
    type: String,
    ref: 'tourServices'
  }],
  tourCategories: [{
    type: String,
    ref: 'tourCategories'
  }],
  discounts: [{
    type: String,
    ref: 'discounts'
  }],
  taxes: [{
    type: String,
    ref: 'taxes'
  }],
  galleryAlbums: [{
    type: String,
    ref: 'galleryAlbums'
  }],
  memberships: [{
    type: String,
    ref: 'memberships'
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


module.exports = mongoose.model('businessOwners', businessOwnersSchema);
