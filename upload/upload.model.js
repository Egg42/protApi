const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* 

	Image Schema for storing images in mongodb Database

*/

const schema =new Schema({
	contentType: {
		type: String,
		default: "none",
		required: true
	},
	image: {
		type: Buffer, 
		required: true
	},

	baseName: {
		type: String,
		required: true,
		unique: true
	}

});

schema.set('toJSON', { virtuals: true });

var Image = mongoose.model('Image', schema);

module.exports = Image;
