const express = require('express');
const router = express.Router();
const uploadService = require('./upload.service');

const fs = require('fs-extra');

// routes
router.get('/', getAll);
router.get('/image/:id', getById);
router.post('/upload', upload);
router.get('/file/:id', getByFile);

router.delete('/delete/:filename', _delete);

module.exports = router;

function getAll(req, res, next) {   
    console.log("Get All Controller");
    uploadService.getAll()
        .then(images => res.json(images))
        .catch(err => next(err));
}

function upload(req,res) {
    //console.log(req.body);
    
    //if (req.files['myFile'] != null){
    uploadService.uploads(req.files)
        .then((images) => {
          console.log("Response")
          console.log(images);
          res.json(images)})
        .catch(err => res.json(err));
    /*  } else if (req.files['employee'] != null ){
         uploadService.upload(req.files['employee'][0])
        .then((images) => {
          console.log("Response")
          console.log(images);
          res.json(images)})
        .catch(err => res.json(err));
      }*/
}
function getById(req, res, next){

      uploadService.getById(req.params.id)
          .then(images => {
              console.log(images);
              res.contentType(images.contentType); 
              res.send(images.image); } )
          .catch(err => next(err));
}
function getByFile(req,res,next){
  uploadService.getByFile(req.params.id)
    .then(images => { 
      console.log(images);
      res.contentType(images.contentType); 
      res.send(images.image);
    })
    .catch(err =>(next(err)));
}
function _delete(req, res, next) {

    uploadService.delete(req.params.filename)
        .then(() => res.json(req.params.filename))
        .catch(err => next(err));
}