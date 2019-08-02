const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Message = db.Message;

module.exports = {
    getAll,
    getById,
    create,
    delete: _delete
};


async function getAll() {
    return await ({"Hello":"Is it me you are looking for"});
}

async function getById(id) {
    return await Message.findById(id);
}

async function create(messageParam) {
    // validate

    const message = new Message(messageParam);

    // Sanatize Data Here
    //

    // save message 
    await message.save();
}


async function _delete(id) {
    await Message.findOneAndDelete(id);
}

