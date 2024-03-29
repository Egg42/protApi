const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    message: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Message', schema);
