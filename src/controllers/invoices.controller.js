/**
 * Created by Jamshaid
 */


//import mongoose and models
var mongoose = require('mongoose')

var config = require('dotenv').config()
//var notificationCtrl = require("./notifications.controller")

//Lodash for data manipulation
const _ = require('lodash')

//bluebird for promises
const promise = require('bluebird')

//async for async tasks
var async = require('async')

const invoiceHelper = require('../helpers/invoices.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createInvoice = async (req, res) => {
    console.log('createInvoice')
    try {
        var invoiceData = req.body
        
        invoiceData.addedby = req.token_decoded.d

        
            var result = await invoiceHelper.createInvoice(invoiceData)
            var message = "Invoice created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getInvoicesWithFullDetails = async (req, res) => {
    console.log("getInvoicesWithFullDetails called")
    var invoiceData = req.body


    try {

        var result = await invoiceHelper.getInvoiceWithFullDetails(invoiceData.sortproperty, invoiceData.sortorder, invoiceData.offset, invoiceData.limit, invoiceData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getInvoicesList = async (req, res) => {
    console.log("getInvoicesList called")
    var invoiceData = req.body


    try {

        var result = await invoiceHelper.getInvoiceList(invoiceData.sortproperty, invoiceData.sortorder, invoiceData.offset, invoiceData.limit, invoiceData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateInvoice = async (req, res) => {
    console.log("request received for updateInvoice")

    var invoiceData = req.body
    var role = req.token_decoded.r
    try {
        invoiceData.lastModifiedBy = req.token_decoded.d
        
            var result = await invoiceHelper.updateInvoice(invoiceData)
            var message = 'Invoice Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeInvoice = async (req, res) => {
    console.log("removeInvoice called")
    try {
        var role = req.token_decoded.r

       
            var invoiceData = req.body
            invoiceData.lastModifiedBy = req.token_decoded.d
            var result = await invoiceHelper.removeInvoice(invoiceData)

            var message = "Invoice removed successfully"

            if (result == "Invoice does not exists.") {
                message = "Invoice does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findInvoiceById = async (req, res) => {
    console.log("findInvoiceById called")
    try {
        var role = req.token_decoded.r

        
            var invoiceData = req.body

            var result = await invoiceHelper.findInvoiceById(invoiceData)
            
            var message = "Invoice find successfully"
            if (result == null) {
                message = "Invoice does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createInvoice,
    getInvoicesWithFullDetails,
    getInvoicesList,
    updateInvoice,
    removeInvoice,
    findInvoiceById

}



