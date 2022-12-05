/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose')


const TourReservation = mongoose.model('tourReservations')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createTourReservation: async (data) => {
        console.log("createTourReservation HelperFunction is called");
        const tourReservation = new TourReservation(data)
        await tourReservation.save()
        return tourReservation
        
    },
    getTourReservationWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getTourReservation Model Function called")

        const tourReservations = await TourReservation.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const tourReservationsize = tourReservations.length

        return {
            tourReservations: tourReservations,
            count: tourReservationsize,
            offset: offset,
            limit: limit
        };
        
    },

    getTourReservationList: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getTourReservation Model Function called")

        const tourReservations = await TourReservation.find(query.critarion).select(query.fields/* '_id TourReservationName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const tourReservationsize = tourReservations.length

        return {
            tourReservations: tourReservations,
            count: tourReservationsize,
            offset: offset,
            limit: limit
        };
        
    },

    updateTourReservation: async (data) => {
        console.log("updateTourReservation HelperFunction is called");
        
        const result = await TourReservation.findOneAndUpdate({_id: data.tourReservationid}, data, {new: true})

        return result; 
                
    },

    

    removeTourReservation: async (data) => {
        console.log("removeTourReservation HelperFunction is called");

        const tourReservation = await TourReservation.findById(data.id);
        if(tourReservation == null){
             var error = "TourReservation does not exists."
             return error
        }
        tourReservation.lastModifiedBy = data.lastModifiedBy
        tourReservation.active = false
        tourReservation.save()
        return tourReservation;
        

    },

    findTourReservationById: async (query) => {
        console.log("findTourReservationById HelperFunction is called");
        
        const tourReservation = await TourReservation.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return tourReservation;
        

    },

    

};
