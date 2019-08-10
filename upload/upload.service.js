
const db = require('_helpers/db');
const fs = require('fs-extra');
const Image = db.Image;
module.exports = {
    getAll,
    getById,
    getByFile, 
    upload,
    uploads,
    delete: _delete
};




async function getAll() {
    console.log("Get All Images");
    return await Image.find().select('-image').select('-baseName');
}

async function getById(id) {
    return await Image.findById(id).select('-baseName');
}
async function getByFile(file){
    return await Image.findOne({baseName: file});
}
async function uploads(files){
    console.log("Uploading Starting");
    const search = files.map( (image) => {
        return image.filename;

    })
    
    const images = files.map( (image) => {
        var img = fs.readFileSync(image.path);
        var encode_image = img.toString('base64');
        const data = {
            contentType: image.mimetype,
            image: new Buffer.from(encode_image, 'base64'),
            baseName: image.filename
        };
        return data;
    });
    fs.emptyDir('uploads/');

    //console.log(search);
    Image.insertMany(images, function(error, docs) {
        if (error){
            console.log("Error");
            throw error;
        }
        else {
            console.log("Image Saved to Database");
        
        console.log("folder cleaned up")
        }
        console.log("Uploading Complete sending back response");
        //console.log(docs);
    });
   
    let response =  await Image.find({baseName: {$in: search }}).select('-image');
    console.log(response);
    console.log("end upload")
    return  search;
}
async function upload(file) {
    // validate
   /* if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        throw error;
    }*/

    // manipulate Data Here
    var img = fs.readFileSync(file.path);
    var encode_image = img.toString('base64');
    
    console.log('New Image' );

    console.log(file.path);
    
    var img = fs.readFileSync(file.path);
    const data = new Image({
    contentType: file.mimetype,
    image: new Buffer.from(encode_image, 'base64'),
    baseName: file.filename
      } );

    
     
    
    // save user
    await data.save( function (err, image) {
        if (err) return console.error(err);
        console.log("Image Saved to Database");
        fs.emptyDir('uploads/')
        console.log("folder cleaned up");
        
        
        //display = { "id": image}.id;
        //console.log(display);
        
    });
    return await Image.find({ 'baseName' : file.filename} , {_id: 1, contentType: 1})
    
}
async function getById(id){
    return await Image.findById(id);
}
async function _delete(id) {

    await Image.findOneAndDelete({baseName: id});
}