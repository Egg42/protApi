const config = require('config.json');
const db = require('_helpers/db');
const Testimonial = db.Testimonial;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};


async function getAll() {
    return await Testimonial.find();
}

async function getById(id) {
    return await Testimonial.findById(id);
}

async function create(dataParam) {
    // validate
   
    //if (await Testimonial.findOne({ person: dataParam.person })) {
    //    throw '"' + dataParam.pserson + '" already gave a testimony';
    //}
    console.log('New Testimony from: ' + dataParam.person);
    console.log('Saying "' + dataParam.quote + '" ' );
    const data = new Testimonial(dataParam);

    // save data
    await data.save();
}

async function update(id, dataParam) {
    const data = await Testimonial.findById(id);

    // validate
    if (!data) throw 'User not found';
    if (Testimonial.person !== dataParam.person && await Testimonial.findOne({ person: dataParam.person })) {
        throw '"' + dataParam.pserson + '" already gave a testimony';
    }


    // copy dataParam properties to data
    

    await Testimonial.findOneAndUpdate(data, dataParam);
}

async function _delete(id) {
    await Testimonial.findOneAndDelete(id);
}
