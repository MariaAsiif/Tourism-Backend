
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.set('debug', true);

galleryAlbumsSchema = new Schema({
    galleryAlbumName: {
        type: String
    },
    galleryImages: [{
        imageName: {
            type: String
        },
        location: {
            type: String
        },
        imagePath: {
            type: String
        },
        details: {
            type: String
        },
        active: {
            type: Boolean
        }
    }],
    businessOwner: {
        type: String,
        ref: 'businessOwners'
    },
    addedby: {
        type: String,
        ref: 'users'
    },

    lastModifiedBy: {
        type: String,
        ref: 'users'
    },
    active: {
        type: Boolean,
        default: true
    }
},
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
        usePushEach: true
    })


module.exports = mongoose.model('galleryAlbums', galleryAlbumsSchema);
