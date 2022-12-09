/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose')

const Customer = mongoose.model('customers')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createCustomer: async (data) => {
        console.log("createCustomer HelperFunction is called");
        const customer = new Customer(data)
        await customer.save()
        return customer
        
    },
    getCustomerWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getCustomer Model Function called")

        const customers = await Customer.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const customersize = customers.length

        return {
            customers: customers,
            count: customersize,
            offset: offset,
            limit: limit
        };
        
    },

    getCustomerList: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getCustomer Model Function called")

        const customers = await Customer.find(query.critarion).select(query.fields/* '_id CustomerName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const customersize = customers.length

        return {
            customers: customers,
            count: customersize,
            offset: offset,
            limit: limit
        };
        
    },

    updateCustomer: async (data) => {
        console.log("updateCustomer HelperFunction is called");
        
        const result = await Customer.findOneAndUpdate({_id: data.customerid}, data, {new: true})

        return result; 
                
    },

    

    removeCustomer: async (data) => {
        console.log("removeCustomer HelperFunction is called");

        const customer = await Customer.findById(data.id);
        if(customer == null){
             var error = "Customer does not exists."
             return error
        }
        customer.lastModifiedBy = data.lastModifiedBy
        customer.active = false
        customer.save()
        return customer;
        

    },

    findCustomerById: async (query) => {
        console.log("findCustomerById HelperFunction is called");
        
        const customer = await Customer.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return customer;
        

    },

    

};
