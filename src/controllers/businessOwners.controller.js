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

const businessOwnerHelper = require('../helpers/businessOwners.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createBusinessOwner = async (req, res) => {
    console.log('createBusinessOwner')
    try {
        var businessOwnerData = req.body
        
        businessOwnerData.addedby = req.token_decoded.d

        
            var result = await businessOwnerHelper.createBusinessOwner(businessOwnerData)
            var message = "BusinessOwner created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getBusinessOwnersWithFullDetails = async (req, res) => {
    console.log("getBusinessOwnersWithFullDetails called")
    var businessOwnerData = req.body


    try {

        var result = await businessOwnerHelper.getBusinessOwnerWithFullDetails(businessOwnerData.sortproperty, businessOwnerData.sortorder, businessOwnerData.offset, businessOwnerData.limit, businessOwnerData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getBusinessOwnersList = async (req, res) => {
    console.log("getBusinessOwnersList called")
    var businessOwnerData = req.body


    try {

        var result = await businessOwnerHelper.getBusinessOwnerList(businessOwnerData.sortproperty, businessOwnerData.sortorder, businessOwnerData.offset, businessOwnerData.limit, businessOwnerData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateBusinessOwner = async (req, res) => {
    console.log("request received for updateBusinessOwner")

    var businessOwnerData = req.body
    var role = req.token_decoded.r
    try {
        businessOwnerData.lastModifiedBy = req.token_decoded.d
        
            var result = await businessOwnerHelper.updateBusinessOwner(businessOwnerData)
            var message = 'BusinessOwner Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeBusinessOwner = async (req, res) => {
    console.log("removeBusinessOwner called")
    try {
        var role = req.token_decoded.r

       
            var businessOwnerData = req.body
            businessOwnerData.lastModifiedBy = req.token_decoded.d
            var result = await businessOwnerHelper.removeBusinessOwner(businessOwnerData)

            var message = "BusinessOwner removed successfully"

            if (result == "BusinessOwner does not exists.") {
                message = "BusinessOwner does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findBusinessOwnerById = async (req, res) => {
    console.log("findBusinessOwnerById called")
    try {
        var role = req.token_decoded.r

        
            var businessOwnerData = req.body

            var result = await businessOwnerHelper.findBusinessOwnerById(businessOwnerData)

            var message = "BusinessOwner find successfully"
            if (result == null) {
                message = "BusinessOwner does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createBusinessOwner,
    getBusinessOwnersWithFullDetails,
    getBusinessOwnersList,
    updateBusinessOwner,
    removeBusinessOwner,
    findBusinessOwnerById

}



