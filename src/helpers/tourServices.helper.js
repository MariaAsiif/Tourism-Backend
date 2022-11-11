/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');




const TourServices = mongoose.model('tourServices')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createTourServices: async (data) => {
        console.log("createTourServices HelperFunction is called");
        const tourService = new TourServices(data)
        await tourService.save()
        return tourService
        
    },
    getTourServicesWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getTourServices Model Function called")

        const tourServices = await TourServices.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const tourServicesize = tourServices.length

        return {
            tourServices: tourServices,
            count: tourServicesize,
            offset: offset,
            limit: limit
        };
        
    },

    getTourServicesList: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getTourServices Model Function called")

        const tourServices = await TourServices.find(query.critarion).select(query.fields/* '_id TourServicesName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const catgsize = tourServices.length

        return {
            tourServices: tourServices,
            count: catgsize,
            offset: offset,
            limit: limit
        };
        
    },

    updateTourServices: async (data) => {
        console.log("updateTourServices HelperFunction is called");
        
        const result = await TourServices.findOneAndUpdate({_id: data.tourServiceid}, data, {new: true})

        return result; 
                
    },

    

    removeTourServices: async (data) => {
        console.log("removeTourServices HelperFunction is called");

        const tourService = await TourServices.findById(data.id);
        if(tourService == null){
             var error = "TourService does not exists."
             return error
        }
        tourService.lastModifiedBy = data.lastModifiedBy
        tourService.active = false
        tourService.save()
        return tourService;
        

    },

    findTourServicesById: async (query) => {
        console.log("findTourServicesById HelperFunction is called");
        
        const tourService = await TourServices.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return tourService;
        

    },

    

};
