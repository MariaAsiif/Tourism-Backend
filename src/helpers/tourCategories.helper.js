/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose');



const TourCategories = mongoose.model('tourCategories')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createTourCategories: async (data) => {
        console.log("createTourCategories HelperFunction is called");
        const tourCategories = new TourCategories(data)
        await tourCategories.save()
        return tourCategories
        
    },
    getTourCategoriesWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getTourCategories Model Function called")

        const tourCategories = await TourCategories.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const tourCategoriesize = tourCategories.length

        return {
            tourCategories: tourCategories,
            count: tourCategoriesize,
            offset: offset,
            limit: limit
        };
        
    },

    getTourCategoriesList: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getTourCategories Model Function called")

        const tourCategories = await TourCategories.find(query.critarion).select(query.fields/* '_id TourCategoriesName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const catgsize = tourCategories.length

        return {
            tourCategories: tourCategories,
            count: catgsize,
            offset: offset,
            limit: limit
        };
        
    },

    updateTourCategories: async (data) => {
        console.log("updateTourCategories HelperFunction is called");
        
        const result = await TourCategories.findOneAndUpdate({_id: data.tourCategoriesid}, data, {new: true})

        return result; 
                
    },

    

    removeTourCategories: async (data) => {
        console.log("removeTourCategories HelperFunction is called");

        const tourCategories = await tourCategories.findById(data.id);
        if(tourCategories == null){
             var error = "tourCategories does not exists."
             return error
        }
        tourCategories.lastModifiedBy = data.lastModifiedBy
        tourCategories.active = false
        tourCategories.save()
        return tourCategories;
        

    },

    findTourCategoriesById: async (query) => {
        console.log("findTourCategoriesById HelperFunction is called");
        
        const tourCategories = await TourCategories.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return tourCategories;
        

    },

    

};
