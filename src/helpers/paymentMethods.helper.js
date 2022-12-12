/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose')

const Hotel = mongoose.model('hotels')
const PaymentMethod = mongoose.model('paymentMethods')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createPaymentMethod: async (data) => {
        console.log("createPaymentMethod HelperFunction is called");
        const paymentMethod = new PaymentMethod(data)
        await paymentMethod.save()
        return paymentMethod
        
    },
    getPaymentMethodWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getPaymentMethod Model Function called")

        const paymentMethods = await PaymentMethod.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const paymentMethodsize = paymentMethods.length

        return {
            paymentMethods: paymentMethods,
            count: paymentMethodsize,
            offset: offset,
            limit: limit
        };
        
    },

    getPaymentMethodList: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getPaymentMethod Model Function called")

        const paymentMethods = await PaymentMethod.find(query.critarion).select(query.fields/* '_id PaymentMethodName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const paymentMethodsize = paymentMethods.length

        return {
            paymentMethods: paymentMethods,
            count: paymentMethodsize,
            offset: offset,
            limit: limit
        };
        
    },

    updatePaymentMethod: async (data) => {
        console.log("updatePaymentMethod HelperFunction is called");
        
        const result = await PaymentMethod.findOneAndUpdate({_id: data.paymentMethodid}, data, {new: true})

        return result; 
                
    },

    

    removePaymentMethod: async (data) => {
        console.log("removePaymentMethod HelperFunction is called");

        const paymentMethod = await PaymentMethod.findById(data.id);
        if(paymentMethod == null){
             var error = "paymentMethod does not exists."
             return error
        }
        paymentMethod.lastModifiedBy = data.lastModifiedBy
        paymentMethod.active = false
        paymentMethod.save()
        return paymentMethod;
        

    },

    findPaymentMethodById: async (query) => {
        console.log("findPaymentMethodById HelperFunction is called");
        
        const paymentMethod = await PaymentMethod.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return paymentMethod;
        

    },

    

};
