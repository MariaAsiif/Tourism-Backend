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

const tourPackageHelper = require('../helpers/tourPackages.helper')
const BusinessOwner = mongoose.model('businessOwners')
//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createTourPackage = async (req, res) => {
    console.log('createTourPackage')
    try {
        var tourPackageData = req.body
        
        tourPackageData.addedby = req.token_decoded.d

        if(tourPackageData.tourPackageType === "customized"){
            if(!tourPackageData.hasOwnProperty("duration")){
                return responseHelper.requestfailure(res, "If tour is customized then it should have duration property")
            }
            if(!tourPackageData.hasOwnProperty("groupInfo")){
                return responseHelper.requestfailure(res, "If tour is customized then it should have groupInfo property")
            }
        }

        
            var result = await tourPackageHelper.createTourPackage(tourPackageData)

            let tourBusinessOwner = await BusinessOwner.findById(tourPackageData.businessOwnerId)
            tourBusinessOwner.tourPackages.push(result._id)
            await tourBusinessOwner.save()
            var message = "TourPackage created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        
        if(err.code == 11000){
            responseHelper.requestfailure(res, "Duplicate Tour Package Number is not allowed");    
        } else {
        responseHelper.requestfailure(res, err);
        }
        
    }
} //end function


var getTourPackagesWithFullDetails = async (req, res) => {
    console.log("getTourPackagesWithFullDetails called")
    var tourPackageData = req.body


    try {

        var result = await tourPackageHelper.getTourPackageWithFullDetails(tourPackageData.sortproperty, tourPackageData.sortorder, tourPackageData.offset, tourPackageData.limit, tourPackageData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getTourPackagesList = async (req, res) => {
    console.log("getTourPackagesList called")
    var tourPackageData = req.body


    try {

        var result = await tourPackageHelper.getTourPackageList(tourPackageData.sortproperty, tourPackageData.sortorder, tourPackageData.offset, tourPackageData.limit, tourPackageData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateTourPackage = async (req, res) => {
    console.log("request received for updateTourPackage")

    var tourPackageData = req.body
    var role = req.token_decoded.r
    try {
        tourPackageData.lastModifiedBy = req.token_decoded.d

        if(tourPackageData.tourPackageType === "customized"){
            if(!tourPackageData.hasOwnProperty("duration")){
                return responseHelper.requestfailure(res, "If tour is customized then it should have duration property")
            }
            if(!tourPackageData.hasOwnProperty("groupInfo")){
                return responseHelper.requestfailure(res, "If tour is customized then it should have groupInfo property")
            }
        }
        
            var result = await tourPackageHelper.updateTourPackage(tourPackageData)
            var message = 'TourPackage Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        if(err.code == 11000){
            responseHelper.requestfailure(res, "Duplicate Tour Package Number is not allowed");    
        } else {
        responseHelper.requestfailure(res, err);
        }
    }
}

var removeTourPackage = async (req, res) => {
    console.log("removeTourPackage called")
    try {
        var role = req.token_decoded.r


        var tourPackageData = req.body
        tourPackageData.lastModifiedBy = req.token_decoded.d
        var result = await tourPackageHelper.removeTourPackage(tourPackageData)

        var message = "TourPackage removed successfully"

        if (result == "TourPackage does not exists.") {
            message = "TourPackage does not exists."
        } else {
            let tourBusinessOwner = await BusinessOwner.findById(tourPackageData.businessOwnerId)
            tourBusinessOwner.tourPackages.splice(tourBusinessOwner.tourPackages.indexOf(tourPackageData.id), 1)
            await tourBusinessOwner.save()
        }
        return responseHelper.success(res, result, message)

    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findTourPackageById = async (req, res) => {
    console.log("findTourPackageById called")
    try {
        var role = req.token_decoded.r

        
            var tourPackageData = req.body

            var result = await tourPackageHelper.findTourPackageById(tourPackageData)
            console.log(result)
            var message = "TourPackage find successfully"
            if (result == null) {
                message = "TourPackage does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createTourPackage,
    getTourPackagesWithFullDetails,
    getTourPackagesList,
    updateTourPackage,
    removeTourPackage,
    findTourPackageById

}



