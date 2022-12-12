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

const galleryAlbumsHelper = require('../helpers/galleryAlbums.helper')

//helper functions
logger = require("../helpers/logger")

responseHelper = require("../helpers/response.helper")

//const notificationtexts = require("../hardCodedData").notificationtexts
const constants = require("../hardCodedData").constants

var pageSize = parseInt(config.PAGE_SIZE)

var createGalleryAlbum = async (req, res) => {
    console.log('createGalleryAlbum')
    try {
        var gallerAlbumData = req.body
        
        gallerAlbumData.addedby = req.token_decoded.d

        
            var result = await galleryAlbumsHelper.createGalleryAlbum(gallerAlbumData)
            var message = "GalleryAlbum created successfully"
            return responseHelper.success(res, result, message)
        

    } catch (err) {
        logger.error(err)
        responseHelper.requestfailure(res, err)
    }
} //end function


var getGalleryAlbumsWithFullDetails = async (req, res) => {
    console.log("getGalleryAlbumsWithFullDetails called")
    var gallerAlbumData = req.body


    try {

        var result = await galleryAlbumsHelper.getGalleryAlbumWithFullDetails(gallerAlbumData.sortproperty, gallerAlbumData.sortorder, gallerAlbumData.offset, gallerAlbumData.limit, gallerAlbumData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var getGalleryAlbumsList = async (req, res) => {
    console.log("getGalleryAlbumsList called")
    var gallerAlbumData = req.body


    try {

        var result = await galleryAlbumsHelper.getGalleryAlbumList(gallerAlbumData.sortproperty, gallerAlbumData.sortorder, gallerAlbumData.offset, gallerAlbumData.limit, gallerAlbumData.query)

        var message = 'Successfully loaded'

        responseHelper.success(res, result, message)
    } catch (err) {

        responseHelper.requestfailure(res, err)
    }
}

var updateGalleryAlbum = async (req, res) => {
    console.log("request received for updateGalleryAlbum")

    var gallerAlbumData = req.body
    var role = req.token_decoded.r
    try {
        gallerAlbumData.lastModifiedBy = req.token_decoded.d
        
            var result = await galleryAlbumsHelper.updateGalleryAlbum(gallerAlbumData)
            var message = 'GalleryAlbum Updated successfully'
        

        responseHelper.success(res, result, message)
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}

var removeGalleryAlbum = async (req, res) => {
    console.log("removeGalleryAlbum called")
    try {
        var role = req.token_decoded.r

       
            var gallerAlbumData = req.body
            gallerAlbumData.lastModifiedBy = req.token_decoded.d
            var result = await galleryAlbumsHelper.removeGalleryAlbum(gallerAlbumData)

            var message = "GalleryAlbum removed successfully"

            if (result == "GalleryAlbum does not exists.") {
                message = "GalleryAlbum does not exists."
            }
            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }


}

var findGalleryAlbumById = async (req, res) => {
    console.log("findGalleryAlbumById called")
    try {
        var role = req.token_decoded.r

        
            var gallerAlbumData = req.body

            var result = await galleryAlbumsHelper.findGalleryAlbumById(gallerAlbumData)
            
            var message = "GalleryAlbum find successfully"
            if (result == null) {
                message = "GalleryAlbum does not exists."
            }


            return responseHelper.success(res, result, message)
        
    } catch (err) {
        responseHelper.requestfailure(res, err)
    }
}






module.exports = {
    createGalleryAlbum,
    getGalleryAlbumsWithFullDetails,
    getGalleryAlbumsList,
    updateGalleryAlbum,
    removeGalleryAlbum,
    findGalleryAlbumById

}



