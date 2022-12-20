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

const didcountHelper = require('../helpers/discounts.helper')
const BusinessOwner = mongoose.model('businessOwners')
//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createDiscount = async (req, res) => {
    console.log('createDiscount')
    try {
        var discountData = req.body

        discountData.addedby = req.token_decoded.d


        var result = await didcountHelper.createDiscount(discountData)
        let tourBusinessOwner = await BusinessOwner.findById(discountData.businessOwnerId)
        tourBusinessOwner.discounts.push(result._id)
        await tourBusinessOwner.save()
        var message = "Discount created successfully"
        return responseHelper.success(res, result, message)


    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getDiscountsWithFullDetails = async (req, res) => {
    console.log("getDiscountsWithFullDetails called")
    var discountData = req.body


    try {

        var result = await didcountHelper.getDiscountWithFullDetails(discountData.sortproperty, discountData.sortorder, discountData.offset, discountData.limit, discountData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getDiscountsList = async (req, res) => {
    console.log("getDiscountsList called")
    var discountData = req.body


    try {

        var result = await didcountHelper.getDiscountList(discountData.sortproperty, discountData.sortorder, discountData.offset, discountData.limit, discountData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateDiscount = async (req, res) => {
    console.log("request received for updateDiscount")

    var discountData = req.body
    var role = req.token_decoded.r
    try {
        discountData.lastModifiedBy = req.token_decoded.d

        var result = await didcountHelper.updateDiscount(discountData)
        var message = 'Discount Updated successfully'


        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeDiscount = async (req, res) => {
    console.log("removeDiscount called")
    try {
        var role = req.token_decoded.r


        var discountData = req.body
        discountData.lastModifiedBy = req.token_decoded.d
        var result = await didcountHelper.removeDiscount(discountData)

        var message = "Discount removed successfully"

        if (result == "Discount does not exists.") {
            message = "Discount does not exists."
        } else {
            let tourBusinessOwner = await BusinessOwner.findById(discountData.businessOwnerId)
            tourBusinessOwner.discounts.splice(tourBusinessOwner.discounts.indexOf(discountData.id), 1)
            await tourBusinessOwner.save()
        }
        return responseHelper.success(res, result, message)

    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findDiscountById = async (req, res) => {
    console.log("findDiscountById called")
    try {
        var role = req.token_decoded.r


        var discountData = req.body

        var result = await didcountHelper.findDiscountById(discountData)
        console.log(result)
        var message = "Discount find successfully"
        if (result == null) {
            message = "Discount does not exists."
        }


        return responseHelper.success(res, result, message)

    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createDiscount,
    getDiscountsWithFullDetails,
    getDiscountsList,
    updateDiscount,
    removeDiscount,
    findDiscountById

}



