/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose')


const GalleryAlbums = mongoose.model('galleryAlbums')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createGalleryAlbum: async (data) => {
        console.log("createGalleryAlbums HelperFunction is called");
        const galleryAlbums = new GalleryAlbums(data)
        await galleryAlbums.save()
        return galleryAlbums
        
    },
    getGalleryAlbumWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getGalleryAlbums Model Function called")

        const galleryAlbumss = await GalleryAlbums.find(query.critarion)
       
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const galleryAlbumssize = galleryAlbumss.length

        return {
            galleryAlbumss: galleryAlbumss,
            count: galleryAlbumssize,
            offset: offset,
            limit: limit
        };
        
    },

    getGalleryAlbumList: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getGalleryAlbums Model Function called")

        const galleryAlbumss = await GalleryAlbums.find(query.critarion).select(query.fields/* '_id galleryAlbumsName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const galleryAlbumssize = galleryAlbumss.length

        return {
            galleryAlbumss: galleryAlbumss,
            count: galleryAlbumssize,
            offset: offset,
            limit: limit
        };
        
    },

    updateGalleryAlbum: async (data) => {
        console.log("updateGalleryAlbums HelperFunction is called");
        
        const result = await GalleryAlbums.findOneAndUpdate({_id: data.galleryAlbumsid}, data, {new: true})

        return result; 
                
    },

    

    removeGalleryAlbum: async (data) => {
        console.log("removeGalleryAlbums HelperFunction is called");

        const galleryAlbums = await GalleryAlbums.findById(data.id);
        if(galleryAlbums == null){
             var error = "galleryAlbums does not exists."
             return error
        }
        galleryAlbums.lastModifiedBy = data.lastModifiedBy
        galleryAlbums.active = false
        galleryAlbums.save()
        return galleryAlbums;
        

    },

    findGalleryAlbumById: async (query) => {
        console.log("findGalleryAlbumsById HelperFunction is called");
        
        const galleryAlbums = await GalleryAlbums.findOne(query.critarion)
        
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return galleryAlbums;
        

    },

    

};
