/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').galleryAlbums

router.post('/createGalleryAlbum', permit(['_a']), controller.createGalleryAlbum)
router.post('/getGalleryAlbumsWithFullDetails', permit(['_a']), controller.getGalleryAlbumsWithFullDetails)
router.post('/updateGalleryAlbum', permit(['_a']), controller.updateGalleryAlbum)
router.post('/removeGalleryAlbum', permit(['_a']), controller.removeGalleryAlbum)
router.post('/getGalleryAlbumsList', permit(['_a']), controller.getGalleryAlbumsList)
router.post('/findGalleryAlbumById', permit(['_a']), controller.findGalleryAlbumById)


module.exports = router
