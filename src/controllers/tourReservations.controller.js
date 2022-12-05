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

const tourReservationHelper = require('../helpers/tourReservations.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createTourReservation = async (req, res) => {
    console.log('createTourReservation')
    try {
        var tourReservationData = req.body
        
        tourReservationData.addedby = req.token_decoded.d

        
            var result = await tourReservationHelper.createTourReservation(tourReservationData)
            var message = "TourReservation created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getTourReservationsWithFullDetails = async (req, res) => {
    console.log("getTourReservationsWithFullDetails called")
    var tourReservationData = req.body


    try {

        var result = await tourReservationHelper.getTourReservationWithFullDetails(tourReservationData.sortproperty, tourReservationData.sortorder, tourReservationData.offset, tourReservationData.limit, tourReservationData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getTourReservationsList = async (req, res) => {
    console.log("getTourReservationsList called")
    var tourReservationData = req.body


    try {

        var result = await tourReservationHelper.getTourReservationList(tourReservationData.sortproperty, tourReservationData.sortorder, tourReservationData.offset, tourReservationData.limit, tourReservationData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateTourReservation = async (req, res) => {
    console.log("request received for updateTourReservation")

    var tourReservationData = req.body
    var role = req.token_decoded.r
    try {
        tourReservationData.lastModifiedBy = req.token_decoded.d
        
            var result = await tourReservationHelper.updateTourReservation(tourReservationData)
            var message = 'TourReservation Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeTourReservation = async (req, res) => {
    console.log("removeTourReservation called")
    try {
        var role = req.token_decoded.r

       
            var tourReservationData = req.body
            tourReservationData.lastModifiedBy = req.token_decoded.d
            var result = await tourReservationHelper.removeTourReservation(tourReservationData)

            var message = "TourReservation removed successfully"

            if (result == "TourReservation does not exists.") {
                message = "TourReservation does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findTourReservationById = async (req, res) => {
    console.log("findTourReservationById called")
    try {
        var role = req.token_decoded.r

        
            var tourReservationData = req.body

            var result = await tourReservationHelper.findTourReservationById(tourReservationData)
            console.log(result)
            var message = "TourReservation find successfully"
            if (result == null) {
                message = "TourReservation does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createTourReservation,
    getTourReservationsWithFullDetails,
    getTourReservationsList,
    updateTourReservation,
    removeTourReservation,
    findTourReservationById

}



