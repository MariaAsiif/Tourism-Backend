/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');




const TourVehicles = mongoose.model('tourVehicles')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createTourVehicles: async (data) => {
        console.log("createTourVehicles HelperFunction is called");
        const tourVehicle = new TourVehicles(data)
        await tourVehicle.save()
        return tourVehicle
        
    },
    getTourVehiclesWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getTourVehicles Model Function called")

        const tourVehicles = await TourVehicles.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const tourVehiclesize = tourVehicles.length

        return {
            tourVehicles: tourVehicles,
            count: tourVehiclesize,
            offset: offset,
            limit: limit
        };
        
    },

    getTourVehiclesList: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getTourVehicles Model Function called")

        const tourVehicles = await TourVehicles.find(query.critarion).select(query.fields/* '_id TourVehiclesName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const catgsize = tourVehicles.length

        return {
            tourVehicles: tourVehicles,
            count: catgsize,
            offset: offset,
            limit: limit
        };
        
    },

    updateTourVehicles: async (data) => {
        console.log("updateTourVehicles HelperFunction is called");
        
        const result = await TourVehicles.findOneAndUpdate({_id: data.tourVehicleid}, data, {new: true})

        return result; 
                
    },

    

    removeTourVehicles: async (data) => {
        console.log("removeTourVehicles HelperFunction is called");

        const tourVehicle = await TourVehicles.findById(data.id);
        if(tourVehicle == null){
             var error = "TourVehicle does not exists."
             return error
        }
        tourVehicle.lastModifiedBy = data.lastModifiedBy
        tourVehicle.active = false
        tourVehicle.save()
        return tourVehicle;
        

    },

    findTourVehiclesById: async (query) => {
        console.log("findTourVehiclesById HelperFunction is called");
        
        const tourVehicle = await TourVehicles.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return tourVehicle;
        

    },

    

};
