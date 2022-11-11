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


const membershipHelper = require('../helpers/memberships.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createMembership = async (req, res) => {
    console.log('createMembership')
    try {
        var membershipData = req.body
        
        membershipData.addedby = req.token_decoded.d

        
            var result = await membershipHelper.createMembership(membershipData)
            var message = "Membership created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getMembershipsWithFullDetails = async (req, res) => {
    console.log("getMembershipsWithFullDetails called")
    var membershipData = req.body


    try {

        var result = await membershipHelper.getMembershipWithFullDetails(membershipData.sortproperty, membershipData.sortorder, membershipData.offset, membershipData.limit, membershipData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getMembershipsList = async (req, res) => {
    console.log("getMembershipsList called")
    var membershipData = req.body


    try {

        var result = await membershipHelper.getMembershipList(membershipData.sortproperty, membershipData.sortorder, membershipData.offset, membershipData.limit, membershipData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateMembership = async (req, res) => {
    console.log("request received for updateMembership")

    var membershipData = req.body
    var role = req.token_decoded.r
    try {
        membershipData.lastModifiedBy = req.token_decoded.d
        
            var result = await membershipHelper.updateMembership(membershipData)
            var message = 'Membership Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeMembership = async (req, res) => {
    console.log("removeMembership called")
    try {
        var role = req.token_decoded.r

       
            var membershipData = req.body
            membershipData.lastModifiedBy = req.token_decoded.d
            var result = await membershipHelper.removeMembership(membershipData)

            var message = "Membership removed successfully"

            if (result == "Membership does not exists.") {
                message = "Membership does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findMembershipById = async (req, res) => {
    console.log("findMembershipById called")
    try {
        var role = req.token_decoded.r

        
            var membershipData = req.body

            var result = await membershipHelper.findMembershipById(membershipData)
            console.log(result)
            var message = "Membership find successfully"
            if (result == null) {
                message = "Membership does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createMembership,
    getMembershipsWithFullDetails,
    getMembershipsList,
    updateMembership,
    removeMembership,
    findMembershipById

}



