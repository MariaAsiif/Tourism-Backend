/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose')


const Tax = mongoose.model('taxes')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createTax: async (data) => {
        console.log("createTax HelperFunction is called");
        const tax = new Tax(data)
        await tax.save()
        return tax
        
    },
    getTaxWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getTax Model Function called")

        const taxs = await Tax.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const taxsize = taxs.length

        return {
            taxs: taxs,
            count: taxsize,
            offset: offset,
            limit: limit
        };
        
    },

    getTaxList: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getTax Model Function called")

        const taxs = await Tax.find(query.critarion).select(query.fields/* '_id TaxName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const taxsize = taxs.length

        return {
            taxs: taxs,
            count: taxsize,
            offset: offset,
            limit: limit
        };
        
    },

    updateTax: async (data) => {
        console.log("updateTax HelperFunction is called");
        
        const result = await Tax.findOneAndUpdate({_id: data.taxid}, data, {new: true})

        return result; 
                
    },

    

    removeTax: async (data) => {
        console.log("removeTax HelperFunction is called");

        const tax = await Tax.findById(data.id);
        if(tax == null){
             var error = "Tax does not exists."
             return error
        }
        tax.lastModifiedBy = data.lastModifiedBy
        tax.active = false
        tax.save()
        return tax;
        

    },

    findTaxById: async (query) => {
        console.log("findTaxById HelperFunction is called");
        
        const tax = await Tax.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return tax;
        

    },

    

};
