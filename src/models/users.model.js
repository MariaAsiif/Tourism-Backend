

var mongoose = require('mongoose')
var Schema = mongoose.Schema

const constants = require("../hardCodedData").constants

mongoose.set('debug', true)

usersSchema = new Schema({
    _id: {
        type: String
    },
    full_name: {
        type: String,
        required: true,
        uppercase: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    password: {
        type: String
    },
    username: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    phoneNumber: {
        type: String
    },
    dob: {
        type: Date
    },
    profile_picture_url: {
        type: String,
        default: '/uploads/dp/default.png'
    },
    ipAddress: {
        type: String
    },
    
    role: {
        type: String,
        enum: constants.roles,
        default: constants.roles[0]
    },
    rolePrivileges: {
        type: String,
        ref: 'roles'
    },
    address: {
        type: String,
        default: ''
    },
    cnic: {
        type: Number
    },
    willingForMembership: {
        type: Boolean,
        default: false,
    },
    verification_code: {
        type: String,
        default: '',
    },
    is_verified: {
        type: Boolean,
        default: false,
    },
    approved: {
        type: String,
        defualt: "pending",
        enum: ["pending", "approved", "disapproved"]
    },
    active: {
        type: Boolean,
        defualt: false
    },
    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
        },
        coordinates: {
            type: [Number]
        }
    }
},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    });

usersSchema.methods.setPassword = function (password) {
    this.password = crypto.createHash('sha1').update(password).digest("hex");
};

usersSchema.methods.validPassword = function (password) {
    var hash = crypto.createHash('sha1').update(password).digest("hex");
    return this.password === hash;
};



usersSchema.index({ "location": "2dsphere" });
usersSchema.on('index', function (err) {
    if (err) {
        console.error('User index error: %s', err);
    } else {
        console.info('User indexing complete');
    }
});
module.exports = mongoose.model('users', usersSchema);
