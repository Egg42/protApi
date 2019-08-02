const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

	title: { type: String, required: true },
    desc: { type: String, required: true },
    location: { type: String, required: false },
    status: { type: String, required: false },
    images: { yupr: Array, required: false },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Listing', schema);