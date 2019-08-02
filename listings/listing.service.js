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
    return await Listing.find().select();
}

async function getById(id) {
    return await Listing.findById(id);
}

async function create(listingParam) {
    // validate

    const listing = new Listing(listingParam);

    // Sanatize Data Here
 

    // save user
    await listing.save();
}

async function update(id, listingParam) {
    await Listing.findOneAndUpdate(listing, listingParam);

   
}

async function _delete(id) {
    await Listing.findOneAndDelete(id);
}