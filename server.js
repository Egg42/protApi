require('rootpath')();
const express = require('express');
const path = require('path');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');
//app.use(express.static(path.join(__dirname, './build/')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(helmet());
// use JWT auth to secure the api
app.use(jwt());

// Rate Limiting
const limit = rateLimit({
    max: 100,// max requests
    windowMs: 60 * 60 * 1000, // 1 Hour of 'ban' / lockout 
    message: 'Too many requests' // message to send
});
// api routes
app.use('/users', require('./users/users.controller'), limit);
app.use('/listings', require('./listings/listing.controller'));
app.use('/messages', require('./messages/messages.controller'));
app.use('/testimonial', require('./testimonials/testimonial.controller'));

app.use(function (err, req, res, next) {
  console.error('404 error')
  res.status(404).send('Opps Something Broke ' + err )
});

// global error handler
app.use(express.json({ limit: '10kb' }));
app.use(mongoSanitize());
app.use(xss());
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 8080) : 4000;
const server = app.listen(8080, '172.30.112.186'. function () {
    console.log('Server listening on port 8080');
});
