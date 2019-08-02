const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    quote: { type: String,  required: true },
    person: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Testimonial', schema);
