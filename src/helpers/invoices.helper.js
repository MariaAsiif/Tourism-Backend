/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose')

const Invoice = mongoose.model('invoices')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createInvoice: async (data) => {
        console.log("createInvoice HelperFunction is called");
        const invoice = new Invoice(data)
        await invoice.save()
        return invoice
        
    },
    getInvoiceWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getInvoice Model Function called")

        const invoices = await Invoice.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const invoicesize = invoices.length

        return {
            invoices: invoices,
            count: invoicesize,
            offset: offset,
            limit: limit
        };
        
    },

    getInvoiceList: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getInvoice Model Function called")

        const invoices = await Invoice.find(query.critarion).select(query.fields/* '_id InvoiceName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const invoicesize = invoices.length

        return {
            invoices: invoices,
            count: invoicesize,
            offset: offset,
            limit: limit
        };
        
    },

    updateInvoice: async (data) => {
        console.log("updateInvoice HelperFunction is called");
        
        const result = await Invoice.findOneAndUpdate({_id: data.invoiceid}, data, {new: true})

        return result; 
                
    },

    

    removeInvoice: async (data) => {
        console.log("removeInvoice HelperFunction is called");

        const invoice = await Invoice.findById(data.id);
        if(invoice == null){
             var error = "Invoice does not exists."
             return error
        }
        invoice.lastModifiedBy = data.lastModifiedBy
        invoice.active = false
        invoice.save()
        return invoice;
        

    },

    findInvoiceById: async (query) => {
        console.log("findInvoiceById HelperFunction is called");
        
        const invoice = await Invoice.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return invoice;
        

    },

    

};
