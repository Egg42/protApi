const express = require('express');
const router = express.Router();
const gameService = require('./listing.service');

// routes
router.post('/create', create);
router.get('/index', getAll);
router.get('/listing/:id', getById);
router.put('/update/:id', update);
router.delete('/delete/:id', _delete);

module.exports = router;



function create(req, res, next) {
    gameService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {    
    gameService.getAll()
        .then(listings => res.json(listings))
        .catch(err => next(err));
}


function getById(req, res, next) {
    gameService.getById(req.params.id)
        .then(game => listing ? res.json(listing) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    gameService.update(req.params.id, req.body)
        .then(() => res.json(req.body))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    gameService.delete(req.params.id)
        .then(() => res.json(req.params.id))
        .catch(err => next(err));
}