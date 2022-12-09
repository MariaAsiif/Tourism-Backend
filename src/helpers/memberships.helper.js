/**
 * Created by Jamshaid
 */

//import mongoose and models
var mongoose = require('mongoose')

const Membership = mongoose.model('memberships')

//bluebird for promises
const promise = require('bluebird');

//helper functions
logger = require("./logger");

module.exports = {

    createMembership: async (data) => {
        console.log("createMembership HelperFunction is called");
        const membership = new Membership(data)
        await membership.save()
        return membership
        
    },
    getMembershipWithFullDetails: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getMembership Model Function called")

        const memberships = await Membership.find(query.critarion)
        .populate('addedby', query.addedby)
        .populate('customer', query.customerFields)
        .populate({
            path: 'customer',
            select: query.customerFields,
            populate: [{
                path: 'user',
                model: 'users',
                select: query.userFields
            }]})
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const membershipsize = memberships.length

        return {
            memberships: memberships,
            count: membershipsize,
            offset: offset,
            limit: limit
        };
        
    },

    getMembershipList: async (sortProperty, sortOrder = -1, offset = 0, limit = 100000, query) => {
        console.log("getMembership Model Function called")

        const memberships = await Membership.find(query.critarion).select(query.fields/* '_id MembershipName' */)
        
        .sort({ [sortProperty]: sortOrder })
        .skip(offset)
        .limit(limit);
              
        const membershipsize = memberships.length

        return {
            memberships: memberships,
            count: membershipsize,
            offset: offset,
            limit: limit
        };
        
    },

    updateMembership: async (data) => {
        console.log("updateMembership HelperFunction is called");
        
        const result = await Membership.findOneAndUpdate({_id: data.membershipid}, data, {new: true})

        return result; 
                
    },

    

    removeMembership: async (data) => {
        console.log("removeMembership HelperFunction is called");

        const membership = await Membership.findById(data.id);
        if(membership == null){
             var error = "Membership does not exists."
             return error
        }
        membership.lastModifiedBy = data.lastModifiedBy
        membership.active = false
        membership.save()
        return membership;
        

    },

    findMembershipById: async (query) => {
        console.log("findMembershipById HelperFunction is called");
        
        const membership = await Membership.findOne(query.critarion)
        .populate({
            path: 'customer',
            select: query.customerFields,
            populate: [{
                path: 'user',
                model: 'users',
                select: query.userFields
            }]})
        .populate('addedby', query.addedby)
        
        .populate('lastModifiedBy', query.lastModifiedBy)
        
        return membership;
        

    },

    

};
