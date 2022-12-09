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

const taxHelper = require('../helpers/taxes.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createTax = async (req, res) => {
    console.log('createTax')
    try {
        var taxData = req.body
        
        taxData.addedby = req.token_decoded.d

        
            var result = await taxHelper.createTax(taxData)
            var message = "Tax created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getTaxsWithFullDetails = async (req, res) => {
    console.log("getTaxsWithFullDetails called")
    var taxData = req.body


    try {

        var result = await taxHelper.getTaxWithFullDetails(taxData.sortproperty, taxData.sortorder, taxData.offset, taxData.limit, taxData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getTaxsList = async (req, res) => {
    console.log("getTaxsList called")
    var taxData = req.body


    try {

        var result = await taxHelper.getTaxList(taxData.sortproperty, taxData.sortorder, taxData.offset, taxData.limit, taxData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateTax = async (req, res) => {
    console.log("request received for updateTax")

    var taxData = req.body
    var role = req.token_decoded.r
    try {
        taxData.lastModifiedBy = req.token_decoded.d
        
            var result = await taxHelper.updateTax(taxData)
            var message = 'Tax Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeTax = async (req, res) => {
    console.log("removeTax called")
    try {
        var role = req.token_decoded.r

       
            var taxData = req.body
            taxData.lastModifiedBy = req.token_decoded.d
            var result = await taxHelper.removeTax(taxData)

            var message = "Tax removed successfully"

            if (result == "Tax does not exists.") {
                message = "Tax does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findTaxById = async (req, res) => {
    console.log("findTaxById called")
    try {
        var role = req.token_decoded.r

        
            var taxData = req.body

            var result = await taxHelper.findTaxById(taxData)
            console.log(result)
            var message = "Tax find successfully"
            if (result == null) {
                message = "Tax does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createTax,
    getTaxsWithFullDetails,
    getTaxsList,
    updateTax,
    removeTax,
    findTaxById

}



