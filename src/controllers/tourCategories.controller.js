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


const tourCategoriesHelper = require('../helpers/tourCategories.helper')
const BusinessOwner = mongoose.model('businessOwners')
//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createTourCategories = async (req, res) => {
    console.log('createTourCategories')
    try {
        var tourCategoriesData = req.body
        
        tourCategoriesData.addedby = req.token_decoded.d

        
            var result = await tourCategoriesHelper.createTourCategories(tourCategoriesData)

            let tourBusinessOwner = await BusinessOwner.findById(tourCategoriesData.businessOwnerId)
            tourBusinessOwner.tourCategories.push(result._id)
            await tourBusinessOwner.save()

            var message = "Tour Category created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getTourCategoriesWithFullDetails = async (req, res) => {
    console.log("getTourCategoriesWithFullDetails called")
    var tourCategoriesData = req.body


    try {

        var result = await tourCategoriesHelper.getTourCategoriesWithFullDetails(tourCategoriesData.sortproperty, tourCategoriesData.sortorder, tourCategoriesData.offset, tourCategoriesData.limit, tourCategoriesData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getTourCategoriesList = async (req, res) => {
    console.log("getTourCategoriesList called")
    var tourCategoriesData = req.body


    try {

        var result = await tourCategoriesHelper.getTourCategoriesList(tourCategoriesData.sortproperty, tourCategoriesData.sortorder, tourCategoriesData.offset, tourCategoriesData.limit, tourCategoriesData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateTourCategories = async (req, res) => {
    console.log("request received for updateTourCategories")

    var tourCategoriesData = req.body
    var role = req.token_decoded.r
    try {
        tourCategoriesData.lastModifiedBy = req.token_decoded.d
        
            var result = await tourCategoriesHelper.updateTourCategories(tourCategoriesData)
            var message = 'TourCategories Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeTourCategories = async (req, res) => {
    console.log("removeTourCategories called")
    try {
        var role = req.token_decoded.r


        var tourCategoriesData = req.body
        tourCategoriesData.lastModifiedBy = req.token_decoded.d
        var result = await tourCategoriesHelper.removeTourCategories(tourCategoriesData)

        var message = "TourCategories removed successfully"

        if (result == "TourCategories does not exists.") {
            message = "TourCategories does not exists."
        } else {
            let tourBusinessOwner = await BusinessOwner.findById(tourCategoriesData.businessOwnerId)
            tourBusinessOwner.tourCategories.splice(tourBusinessOwner.tourCategories.indexOf(result._id), 1)
            await tourBusinessOwner.save()
        }
        return responseHelper.success(res, result, message)

    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findTourCategoriesById = async (req, res) => {
    console.log("findTourCategoriesById called")
    try {
        var role = req.token_decoded.r

        
            var tourCategoriesData = req.body

            var result = await tourCategoriesHelper.findTourCategoriesById(tourCategoriesData)
            console.log(result)
            var message = "TourCategories find successfully"
            if (result == null) {
                message = "TourCategories does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createTourCategories,
    getTourCategoriesWithFullDetails,
    getTourCategoriesList,
    updateTourCategories,
    removeTourCategories,
    findTourCategoriesById

}



