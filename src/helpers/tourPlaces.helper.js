/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose')

const TourPlaces = mongoose.model('tourPlaces')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createTourPlaces: async (data) => {
        console.log("createTourPlaces HelperFunction is called");
        const tourPlace = new TourPlaces(data)
        await tourPlace.save()
        return tourPlace
        
    },
    getTourPlacesWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getTourPlaces Model Function called")

        const tourPlaces = await TourPlaces.find(query.critarion)
       .populate('tourCategory', query.tourCategoryFields)
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const tourPlacesize = tourPlaces.length

        return {
            tourPlaces: tourPlaces,
            count: tourPlacesize,
            offset: offset,
            limit: limit
        };
        
    },

    getTourPlacesList: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getTourPlaces Model Function called")

        const tourPlaces = await TourPlaces.find(query.critarion).select(query.fields/* '_id TourPlacesName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const tourPlacesize = tourPlaces.length

        return {
            tourPlaces: tourPlaces,
            count: tourPlacesize,
            offset: offset,
            limit: limit
        };
        
    },

    updateTourPlaces: async (data) => {
        console.log("updateTourPlaces HelperFunction is called");
        
        const result = await TourPlaces.findOneAndUpdate({_id: data.tourPlaceid}, data, {new: true})

        return result; 
                
    },

    

    removeTourPlaces: async (data) => {
        console.log("removeTourPlaces HelperFunction is called");

        const tourPlace = await TourPlaces.findById(data.id);
        if(tourPlace == null){
             var error = "TourPlace does not exists."
             return error
        }
        tourPlace.lastModifiedBy = data.lastModifiedBy
        tourPlace.active = false
        tourPlace.save()
        return tourPlace;
        

    },

    findTourPlacesById: async (query) => {
        console.log("findTourPlacesById HelperFunction is called");
        
        const tourPlace = await TourPlaces.findOne(query.critarion)
        .populate('tourCategory', query.tourCategoryFields)
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return tourPlace;
        

    },

    

};
