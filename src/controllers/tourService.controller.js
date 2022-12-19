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

const tourServicerHelpter = require('../helpers/tourServices.helper')
const BusinessOwner = mongoose.model('businessOwners')
//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createTourService = async (req, res) => {
    console.log('createTourService')
    try {
        var tourServiceData = req.body
        
        tourServiceData.addedby = req.token_decoded.d

        
            var result = await tourServicerHelpter.createTourServices(tourServiceData)
            let tourBusinessOwner = await BusinessOwner.findById(tourServiceData.businessOwnerId)
            tourBusinessOwner.additionalServices.push(result._id)
            await tourBusinessOwner.save()

            var message = "TourService created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getTourServicesWithFullDetails = async (req, res) => {
    console.log("getTourServicesWithFullDetails called")
    var tourServiceData = req.body


    try {

        var result = await tourServicerHelpter.getTourServicesWithFullDetails(tourServiceData.sortproperty, tourServiceData.sortorder, tourServiceData.offset, tourServiceData.limit, tourServiceData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getTourServicesList = async (req, res) => {
    console.log("getTourServicesList called")
    var tourServiceData = req.body


    try {

        var result = await tourServicerHelpter.getTourServicesList(tourServiceData.sortproperty, tourServiceData.sortorder, tourServiceData.offset, tourServiceData.limit, tourServiceData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateTourService = async (req, res) => {
    console.log("request received for updateTourService")

    var tourServiceData = req.body
    var role = req.token_decoded.r
    try {
        tourServiceData.lastModifiedBy = req.token_decoded.d
        
            var result = await tourServicerHelpter.updateTourServices(tourServiceData)
            var message = 'TourService Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeTourService = async (req, res) => {
    console.log("removeTourService called")
    try {
        var role = req.token_decoded.r

       
            var tourServiceData = req.body
            tourServiceData.lastModifiedBy = req.token_decoded.d
            var result = await tourServicerHelpter.removeTourServices(tourServiceData)

            


            var message = "TourService removed successfully"

            if (result == "TourService does not exists.") {
                message = "TourService does not exists."
            } else {
                let tourBusinessOwner = await BusinessOwner.findById(tourServiceData.businessOwnerId)
            tourBusinessOwner.additionalServices.splice(tourBusinessOwner.additionalServices.indexOf(tourServiceData.id), 1)
            await tourBusinessOwner.save()
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findTourServiceById = async (req, res) => {
    console.log("findTourServiceById called")
    try {
        var role = req.token_decoded.r

        
            var tourServiceData = req.body

            var result = await tourServicerHelpter.findTourServicesById(tourServiceData)
            console.log(result)
            var message = "TourService find successfully"
            if (result == null) {
                message = "TourService does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createTourService,
    getTourServicesWithFullDetails,
    getTourServicesList,
    updateTourService,
    removeTourService,
    findTourServiceById

}



