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
const logger = require('morgan');
//app.use(express.static(path.join(__dirname, './build/')));
const multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    var temp = String(file.mimetype).replace('/','.');
    console.log(temp);
    cb(null, file.fieldname + '-' + Date.now() +'-'+ Math.random() + temp); 
  }
})

var upload = multer({ storage: storage })


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(helmet());
// use JWT auth to secure the api
//app.use(jwt());
app.use(logger('dev'));

// Rate Limiting
const limit = rateLimit({
    max: 100,// max requests
    windowMs: 60 * 60 * 1000, // 1 Hour of 'ban' / lockout 
    message: 'Too many requests' // message to send
});
app.use(express.json({ limit: '10kb' }));
app.use(mongoSanitize());
app.use(xss());
app.use(express.static(path.join(__dirname, 'dist')));
// api routes upload.fields([{ name: 'employee', maxCount: 1 }, { name: 'myFile', maxCount: 8 }])
app.use('/api/users', jwt(),require('./users/users.controller') );
app.use('/api/listings', jwt(), require('./listings/listing.controller'));
app.use('/api/messages', jwt(),require('./messages/messages.controller'));
app.use('/api/testimonial', jwt(),require('./testimonials/testimonial.controller'));
app.use('/api/uploads', upload.array('myFile'),jwt(), require('./upload/upload.controller'));
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/dist/index.html'));
});

app.use(function (err, req, res, next) {
  console.error('404 error ' + err)
  res.status(404).send('Opps Something Broke ' + err )

});

// global error handler

app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(8080, '0.0.0.0', function () {
    console.log('Server listening on port 8080');
});
