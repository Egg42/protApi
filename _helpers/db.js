const config = require('../config.json');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.connect( config.conectionString, { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model'),
    Listing: require('../listings/listing.model'),
    Message: require('../messages/message.model'),
    Testimonial: require('../testimonials/testimonial.model'),
};