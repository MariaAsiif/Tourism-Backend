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

const tourPlacesHelper = require('../helpers/tourPlaces.helper')
const BusinessOwner = mongoose.model('businessOwners')


//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createTourPlace = async (req, res) => {
    console.log('createTourPlace')
    try {
        var tourPlaceData = req.body
        
        tourPlaceData.addedby = req.token_decoded.d

        
            var result = await tourPlacesHelper.createTourPlaces(tourPlaceData)

            let tourBusinessOwner = await BusinessOwner.findById(tourPlaceData.businessOwnerId)
            tourBusinessOwner.tourPlaces.push(result._id)
            await tourBusinessOwner.save()

            var message = "TourPlace created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getTourPlacesWithFullDetails = async (req, res) => {
    console.log("getTourPlacesWithFullDetails called")
    var tourPlaceData = req.body


    try {

        var result = await tourPlacesHelper.getTourPlacesWithFullDetails(tourPlaceData.sortproperty, tourPlaceData.sortorder, tourPlaceData.offset, tourPlaceData.limit, tourPlaceData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getTourPlacesList = async (req, res) => {
    console.log("getTourPlacesList called")
    var tourPlaceData = req.body


    try {

        var result = await tourPlacesHelper.getTourPlacesList(tourPlaceData.sortproperty, tourPlaceData.sortorder, tourPlaceData.offset, tourPlaceData.limit, tourPlaceData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateTourPlace = async (req, res) => {
    console.log("request received for updateTourPlace")

    var tourPlaceData = req.body
    var role = req.token_decoded.r
    try {
        tourPlaceData.lastModifiedBy = req.token_decoded.d
        
            var result = await tourPlacesHelper.updateTourPlaces(tourPlaceData)
            var message = 'TourPlace Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeTourPlace = async (req, res) => {
    console.log("removeTourPlace called")
    try {
        var role = req.token_decoded.r


        var tourPlaceData = req.body
        tourPlaceData.lastModifiedBy = req.token_decoded.d
        var result = await tourPlacesHelper.removeTourPlaces(tourPlaceData)



        var message = "TourPlace removed successfully"

        if (result == "TourPlace does not exists.") {
            message = "TourPlace does not exists."
        } else {
            let tourBusinessOwner = await BusinessOwner.findById(tourPlaceData.businessOwnerId)
            tourBusinessOwner.tourPlaces.splice(tourBusinessOwner.tourPlaces.indexOf(result._id), 1)
            await tourBusinessOwner.save()
        }
        return responseHelper.success(res, result, message)

    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findTourPlaceById = async (req, res) => {
    console.log("findTourPlaceById called")
    try {
        var role = req.token_decoded.r

        
            var tourPlaceData = req.body

            var result = await tourPlacesHelper.findTourPlacesById(tourPlaceData)
            console.log(result)
            var message = "TourPlace find successfully"
            if (result == null) {
                message = "TourPlace does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createTourPlace,
    getTourPlacesWithFullDetails,
    getTourPlacesList,
    updateTourPlace,
    removeTourPlace,
    findTourPlaceById

}



