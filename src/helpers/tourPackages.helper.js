/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose')

const TourPackage = mongoose.model('tourPackages')
//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createTourPackage: async (data) => {
        console.log("createTourPackage HelperFunction is called");
        const tourPackage = new TourPackage(data)
        await tourPackage.save()
        return tourPackage
        
    },
    getTourPackageWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getTourPackage Model Function called")

        const tourPackages = await TourPackage.find(query.critarion)
        .populate('tourCategory', query.tourCategoryFields)
        .populate({
            path: 'departurePlaces',
            select: query.departurePlacesFields,
            populate: {
                path: 'tourCategory',
                model: 'tourCategories',
                select: query.tourCategoryFields
            }
        })
        .populate({
            path: 'arrivalPlaces',
            select: query.arrivalPlacesFields,
            populate: {
                path: 'tourCategory',
                model: 'tourCategories',
                select: query.tourCategoryFields
            }
        })
        .populate({
            path: 'placesToVisit',
            select: query.placesToVisitFields,
            populate: {
                path: 'tourCategory',
                model: 'tourCategories',
                select: query.tourCategoryFields
            }
        })
        
        
        .populate('hotels', query.hotelsFields)
        .populate('additionalServices', query.additionalServicesFields)
        .populate('tourVehicles', query.tourVehiclesFields)
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const tourPackagesize = tourPackages.length

        return {
            tourPackages: tourPackages,
            count: tourPackagesize,
            offset: offset,
            limit: limit
        };
        
    },

    getTourPackageList: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getTourPackage Model Function called")

        const tourPackages = await TourPackage.find(query.critarion).select(query.fields/* '_id tourPackageName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const tourPackagesize = tourPackages.length

        return {
            tourPackages: tourPackages,
            count: tourPackagesize,
            offset: offset,
            limit: limit
        };
        
    },

    updateTourPackage: async (data) => {
        console.log("updateTourPackage HelperFunction is called");
        
        const result = await TourPackage.findOneAndUpdate({_id: data.tourPackageid}, data, {new: true})

        return result; 
                
    },

    

    removeTourPackage: async (data) => {
        console.log("removeTourPackage HelperFunction is called");

        const tourPackage = await TourPackage.findById(data.id);
        if(tourPackage == null){
             var error = "TourPackage does not exists."
             return error
        }
        tourPackage.lastModifiedBy = data.lastModifiedBy
        tourPackage.active = false
        tourPackage.save()
        return tourPackage;
        

    },

    findTourPackageById: async (query) => {
        console.log("findTourPackageById HelperFunction is called");
        
        const tourPackage = await TourPackage.findOne(query.critarion)
        .populate({
            path: 'departurePlaces',
            select: query.departurePlacesFields,
            populate: {
                path: 'tourCategory',
                model: 'tourCategories',
                select: query.tourCategoryFields
            }
        })
        .populate({
            path: 'arrivalPlaces',
            select: query.arrivalPlacesFields,
            populate: {
                path: 'tourCategory',
                model: 'tourCategories',
                select: query.tourCategoryFields
            }
        })
        .populate({
            path: 'placesToVisit',
            select: query.placesToVisitFields,
            populate: {
                path: 'tourCategory',
                model: 'tourCategories',
                select: query.tourCategoryFields
            }
        })
        
        
        .populate('hotels', query.hotelsFields)
        .populate('additionalServices', query.additionalServicesFields)
        .populate('tourVehicles', query.tourVehiclesFields)
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return tourPackage;
        

    },

    

};
