const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

	address: { type: String, required: true },
    city: { type: String, required: true },
    bath: {type: String, required: true},
    bed: {type: String, required: false },
    parking: {type: String, required: false},
    space: {type: String, required: true },
   	price: {type: String, required: true},
    location: { type: String, required: true },
    status: { type: String, required: true },
    images: [ {contentType: {
        type: String,
        default: "none",
        required: false
    },
    data: {
        type: Buffer, 
        required: false
    },

    baseName: {
        type: String,
        required: false
        
    } } ],
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Listing', schema);