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

const frontEndModuleHelper = require('../helpers/frontEndModules.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createFrontEndModule = async (req, res) => {
    console.log('createFrontEndModule')
    try {
        var frontEndModuleData = req.body
        
        frontEndModuleData.addedby = req.token_decoded.d

        
            var result = await frontEndModuleHelper.createFrontEndModule(frontEndModuleData)
            var message = "FrontEndModule created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getFrontEndModulesWithFullDetails = async (req, res) => {
    console.log("getFrontEndModulesWithFullDetails called")
    var frontEndModuleData = req.body


    try {

        var result = await frontEndModuleHelper.getFrontEndModuleWithFullDetails(frontEndModuleData.sortproperty, frontEndModuleData.sortorder, frontEndModuleData.offset, frontEndModuleData.limit, frontEndModuleData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getFrontEndModulesList = async (req, res) => {
    console.log("getFrontEndModulesList called")
    var frontEndModuleData = req.body


    try {

        var result = await frontEndModuleHelper.getFrontEndModuleList(frontEndModuleData.sortproperty, frontEndModuleData.sortorder, frontEndModuleData.offset, frontEndModuleData.limit, frontEndModuleData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateFrontEndModule = async (req, res) => {
    console.log("request received for updateFrontEndModule")

    var frontEndModuleData = req.body
    var role = req.token_decoded.r
    try {
        frontEndModuleData.lastModifiedBy = req.token_decoded.d
        
            var result = await frontEndModuleHelper.updateFrontEndModule(frontEndModuleData)
            var message = 'FrontEndModule Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeFrontEndModule = async (req, res) => {
    console.log("removeFrontEndModule called")
    try {
        var role = req.token_decoded.r

       
            var frontEndModuleData = req.body
            frontEndModuleData.lastModifiedBy = req.token_decoded.d
            var result = await frontEndModuleHelper.removeFrontEndModule(frontEndModuleData)

            var message = "FrontEndModule removed successfully"

            if (result == "FrontEndModule does not exists.") {
                message = "FrontEndModule does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findFrontEndModuleById = async (req, res) => {
    console.log("findFrontEndModuleById called")
    try {
        var role = req.token_decoded.r

        
            var frontEndModuleData = req.body

            var result = await frontEndModuleHelper.findFrontEndModuleById(frontEndModuleData)
            
            var message = "FrontEndModule find successfully"
            if (result == null) {
                message = "FrontEndModule does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createFrontEndModule,
    getFrontEndModulesWithFullDetails,
    getFrontEndModulesList,
    updateFrontEndModule,
    removeFrontEndModule,
    findFrontEndModuleById

}



