const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Listing = db.Listing;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};


async function getAll() {
    
    return await Listing.find();
}

async function getById(id) {
    return await Listing.findById(id);
}

async function create(listingParam) {
    // validate
    
    const data = new Listing(listingParam);

    // Sanatize Data Here
 

    // save user
    await data.save();
    return await Listing.find();
}

async function update(id, listingParam) {
    await Listing.findOneAndUpdate(listing, listingParam);

   
}

async function _delete(id) {
    await Listing.findOneAndDelete(id);
}