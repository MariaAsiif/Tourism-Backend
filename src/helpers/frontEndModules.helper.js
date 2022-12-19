/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose')

const FrontEndModule = mongoose.model('frontEndModules')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createFrontEndModule: async (data) => {
        console.log("createFrontEndModule HelperFunction is called");
        const frontEndModule = new FrontEndModule(data)
        await frontEndModule.save()
        return frontEndModule
        
    },
    getFrontEndModuleWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getFrontEndModule Model Function called")

        const FrontEndModules = await FrontEndModule.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const frontEndModulesize = frontEndModules.length

        return {
            frontEndModules: frontEndModules,
            count: frontEndModulesize,
            offset: offset,
            limit: limit
        };
        
    },

    getFrontEndModuleList: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getFrontEndModule Model Function called")

        const frontEndModules = await FrontEndModule.find(query.critarion).select(query.fields/* '_id FrontEndModuleName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const frontEndModulesize = frontEndModules.length

        return {
            frontEndModules: frontEndModules,
            count: frontEndModulesize,
            offset: offset,
            limit: limit
        };
        
    },

    updateFrontEndModule: async (data) => {
        console.log("updateFrontEndModule HelperFunction is called");
        
        const result = await FrontEndModule.findOneAndUpdate({_id: data.frontEndModuleid}, data, {new: true})

        return result; 
                
    },

    

    removeFrontEndModule: async (data) => {
        console.log("removeFrontEndModule HelperFunction is called");

        const frontEndModule = await FrontEndModule.findById(data.id);
        if(frontEndModule == null){
             var error = "FrontEndModule does not exists."
             return error
        }
        frontEndModule.lastModifiedBy = data.lastModifiedBy
        frontEndModule.active = false
        frontEndModule.save()
        return frontEndModule;
        

    },

    findFrontEndModuleById: async (query) => {
        console.log("findFrontEndModuleById HelperFunction is called");
        
        const frontEndModule = await FrontEndModule.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return frontEndModule;
        

    },

    

};
