/**
 * Created by Jamshaid.
 */
 
const express = require('express')
const router = express.Router()
const permit = require('../../middlewares').permit

const controller = require('../../controllers').galleryAlbums

router.post('/createGalleryAlbum', permit(['_a', '_bo']), controller.createGalleryAlbum)
router.post('/getGalleryAlbumsWithFullDetails', permit(['_a', '_bo']), controller.getGalleryAlbumsWithFullDetails)
router.post('/updateGalleryAlbum', permit(['_a', '_bo']), controller.updateGalleryAlbum)
router.post('/removeGalleryAlbum', permit(['_a', '_bo']), controller.removeGalleryAlbum)
router.post('/getGalleryAlbumsList', permit(['_a', '_bo']), controller.getGalleryAlbumsList)
router.post('/findGalleryAlbumById', permit(['_a', '_bo']), controller.findGalleryAlbumById)


module.exports = router
