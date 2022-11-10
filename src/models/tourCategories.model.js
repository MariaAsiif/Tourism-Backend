
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.set('debug', true);

tourCategoriesSchema = new Schema({
    tourCategoryName: {
        type: String
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

module.exports = mongoose.model('tourCategories', tourCategoriesSchema);
