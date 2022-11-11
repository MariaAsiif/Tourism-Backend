/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose')

const Discount = mongoose.model('discounts')
//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createDiscount: async (data) => {
        console.log("createDiscount HelperFunction is called");
        const discount = new Discount(data)
        await discount.save()
        return discount
        
    },
    getDiscountWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getDiscount Model Function called")

        const discounts = await Discount.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const discountsize = discounts.length

        return {
            discounts: discounts,
            count: discountsize,
            offset: offset,
            limit: limit
        };
        
    },

    getDiscountList: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getDiscount Model Function called")

        const discounts = await Discount.find(query.critarion).select(query.fields/* '_id DiscountName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const discountsize = discounts.length

        return {
            discounts: discounts,
            count: discountsize,
            offset: offset,
            limit: limit
        };
        
    },

    updateDiscount: async (data) => {
        console.log("updateDiscount HelperFunction is called");
        
        const result = await Discount.findOneAndUpdate({_id: data.discountid}, data, {new: true})

        return result; 
                
    },

    

    removeDiscount: async (data) => {
        console.log("removeDiscount HelperFunction is called");

        const discount = await Discount.findById(data.id);
        if(discount == null){
             var error = "Discount does not exists."
             return error
        }
        discount.lastModifiedBy = data.lastModifiedBy
        discount.active = false
        discount.save()
        return discount;
        

    },

    findDiscountById: async (query) => {
        console.log("findDiscountById HelperFunction is called");
        
        const discount = await Discount.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return discount;
        

    },

    

};
