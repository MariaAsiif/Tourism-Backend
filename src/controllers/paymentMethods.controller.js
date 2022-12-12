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

const paymentMethodHelper = require('../helpers/paymentMethods.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createPaymentMethod = async (req, res) => {
    console.log('createPaymentMethod')
    try {
        var paymentMethodData = req.body
        
        paymentMethodData.addedby = req.token_decoded.d

        
            var result = await paymentMethodHelper.createPaymentMethod(paymentMethodData)
            var message = "PaymentMethod created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getPaymentMethodsWithFullDetails = async (req, res) => {
    console.log("getPaymentMethodsWithFullDetails called")
    var paymentMethodData = req.body


    try {

        var result = await paymentMethodHelper.getPaymentMethodWithFullDetails(paymentMethodData.sortproperty, paymentMethodData.sortorder, paymentMethodData.offset, paymentMethodData.limit, paymentMethodData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getPaymentMethodsList = async (req, res) => {
    console.log("getPaymentMethodsList called")
    var paymentMethodData = req.body


    try {

        var result = await paymentMethodHelper.getPaymentMethodList(paymentMethodData.sortproperty, paymentMethodData.sortorder, paymentMethodData.offset, paymentMethodData.limit, paymentMethodData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updatePaymentMethod = async (req, res) => {
    console.log("request received for updatePaymentMethod")

    var paymentMethodData = req.body
    var role = req.token_decoded.r
    try {
        paymentMethodData.lastModifiedBy = req.token_decoded.d
        
            var result = await paymentMethodHelper.updatePaymentMethod(paymentMethodData)
            var message = 'PaymentMethod Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removePaymentMethod = async (req, res) => {
    console.log("removePaymentMethod called")
    try {
        var role = req.token_decoded.r

       
            var paymentMethodData = req.body
            paymentMethodData.lastModifiedBy = req.token_decoded.d
            var result = await paymentMethodHelper.removePaymentMethod(paymentMethodData)

            var message = "PaymentMethod removed successfully"

            if (result == "PaymentMethod does not exists.") {
                message = "PaymentMethod does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findPaymentMethodById = async (req, res) => {
    console.log("findPaymentMethodById called")
    try {
        var role = req.token_decoded.r

        
            var paymentMethodData = req.body

            var result = await paymentMethodHelper.findPaymentMethodById(paymentMethodData)
            
            var message = "PaymentMethod find successfully"
            if (result == null) {
                message = "PaymentMethod does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createPaymentMethod,
    getPaymentMethodsWithFullDetails,
    getPaymentMethodsList,
    updatePaymentMethod,
    removePaymentMethod,
    findPaymentMethodById

}



