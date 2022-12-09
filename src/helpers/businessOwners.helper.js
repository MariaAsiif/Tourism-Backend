/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose')

const BusinessOwner = mongoose.model('businessOwners')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createBusinessOwner: async (data) => {
        console.log("createBusinessOwner HelperFunction is called");
        const businessOwner = new BusinessOwner(data)
        await businessOwner.save()
        return businessOwner
        
    },
    getBusinessOwnerWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getBusinessOwner Model Function called")

        const businessOwners = await BusinessOwner.find(query.critarion)
        .populate('businessOwner', query.businessOwnerFields)
        .populate('hotels', query.hotelsFields)
        .populate('tourVehicles', query.tourVehiclesFields)
        .populate('tourPlaces', query.tourPlacesFields)
        .populate('tourCategories', query.tourCategoriesFields)
        .populate('discounts', query.discountsFields)
        .populate('taxes', query.taxesFields)
        
        .populate('tourPackages', query.tourPackagesFields)
        .populate('addedby', query.addedby)        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const businessOwnersize = businessOwners.length

        return {
            businessOwners: businessOwners,
            count: businessOwnersize,
            offset: offset,
            limit: limit
        };
        
    },

    getBusinessOwnerList: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getBusinessOwner Model Function called")

        const businessOwners = await BusinessOwner.find(query.critarion).select(query.fields/* '_id BusinessOwnerName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const businessOwnersize = businessOwners.length

        return {
            businessOwners: businessOwners,
            count: businessOwnersize,
            offset: offset,
            limit: limit
        };
        
    },

    updateBusinessOwner: async (data) => {
        console.log("updateBusinessOwner HelperFunction is called");
        
        const result = await BusinessOwner.findOneAndUpdate({_id: data.businessOwnerid}, data, {new: true})

        return result; 
                
    },

    

    removeBusinessOwner: async (data) => {
        console.log("removeBusinessOwner HelperFunction is called");

        const businessOwner = await BusinessOwner.findById(data.id);
        if(businessOwner == null){
             var error = "BusinessOwner does not exists."
             return error
        }
        businessOwner.lastModifiedBy = data.lastModifiedBy
        businessOwner.active = false
        businessOwner.save()
        return businessOwner;
        

    },

    findBusinessOwnerById: async (query) => {
        console.log("findBusinessOwnerById HelperFunction is called");
        
        const businessOwner = await BusinessOwner.findOne(query.critarion)
        .populate('businessOwner', query.businessOwnerFields)
        .populate('hotels', query.hotelsFields)
        .populate('tourVehicles', query.tourVehiclesFields)
        .populate('tourPlaces', query.tourPlacesFields)
        .populate('tourCategories', query.tourCategoriesFields)
        .populate('discounts', query.discountsFields)
        .populate('taxes', query.taxesFields)
        
        .populate('tourPackages', query.tourPackagesFields)
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return businessOwner;
        

    },

    

};
