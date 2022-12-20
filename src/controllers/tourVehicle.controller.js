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

const tourVehicleHelpter = require('../helpers/tourVehicles.helper')
const BusinessOwner = mongoose.model('businessOwners')
//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createTourVehicle = async (req, res) => {
    console.log('createTourVehicle')
    try {
        var tourVehicleData = req.body
        
        tourVehicleData.addedby = req.token_decoded.d

        
            var result = await tourVehicleHelpter.createTourVehicles(tourVehicleData)

            let tourBusinessOwner = await BusinessOwner.findById(tourVehicleData.businessOwnerId)
            tourBusinessOwner.tourVehicles.push(result._id)
            await tourBusinessOwner.save()
            var message = "TourVehicle created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getTourVehiclesWithFullDetails = async (req, res) => {
    console.log("getTourVehiclesWithFullDetails called")
    var tourVehicleData = req.body


    try {

        var result = await tourVehicleHelpter.getTourVehiclesWithFullDetails(tourVehicleData.sortproperty, tourVehicleData.sortorder, tourVehicleData.offset, tourVehicleData.limit, tourVehicleData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getTourVehiclesList = async (req, res) => {
    console.log("getTourVehiclesList called")
    var tourVehicleData = req.body


    try {

        var result = await tourVehicleHelpter.getTourVehiclesList(tourVehicleData.sortproperty, tourVehicleData.sortorder, tourVehicleData.offset, tourVehicleData.limit, tourVehicleData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateTourVehicle = async (req, res) => {
    console.log("request received for updateTourVehicle")

    var tourVehicleData = req.body
    var role = req.token_decoded.r
    try {
        tourVehicleData.lastModifiedBy = req.token_decoded.d
        
            var result = await tourVehicleHelpter.updateTourVehicles(tourVehicleData)
            var message = 'TourVehicle Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeTourVehicle = async (req, res) => {
    console.log("removeTourVehicle called")
    try {
        var role = req.token_decoded.r

       
            var tourVehicleData = req.body
            tourVehicleData.lastModifiedBy = req.token_decoded.d
            var result = await tourVehicleHelpter.removeTourVehicles(tourVehicleData)

            var message = "TourVehicle removed successfully"

            if (result == "TourVehicle does not exists.") {
                message = "TourVehicle does not exists."
            }else {
                let tourBusinessOwner = await BusinessOwner.findById(tourVehicleData.businessOwnerId)
                tourBusinessOwner.tourVehicles.splice(tourBusinessOwner.tourVehicles.indexOf(tourVehicleData.id), 1)
                await tourBusinessOwner.save()
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findTourVehicleById = async (req, res) => {
    console.log("findTourVehicleById called")
    try {
        var role = req.token_decoded.r

        
            var tourVehicleData = req.body

            var result = await tourVehicleHelpter.findTourVehiclesById(tourVehicleData)
            console.log(result)
            var message = "TourVehicle find successfully"
            if (result == null) {
                message = "TourVehicle does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createTourVehicle,
    getTourVehiclesWithFullDetails,
    getTourVehiclesList,
    updateTourVehicle,
    removeTourVehicle,
    findTourVehicleById

}



