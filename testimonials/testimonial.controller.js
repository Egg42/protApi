
const express = require('express');
const router = express.Router();
const testimonialService = require('./testimonial.service');

// routes

router.post('/create', create);
router.get('/index', getAll);
router.get('/testimonial/:id', getById);
router.put('/update/:id', update);
router.delete('/delete/:id', _delete);

module.exports = router;

function create(req, res, next) {
    testimonialService.create(req.body)
        .then((testimony) => res.json(testimony))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    
    testimonialService.getAll()
        .then(testimony => {res.json(testimony);
                       })
        .catch(err => next(err));
}


function getById(req, res, next) {
    testimonialService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    testimonialService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    console.log("Deleting Log " + req.params.id);
    testimonialService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}