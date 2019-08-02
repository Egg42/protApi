const express = require('express');
const router = express.Router();
const messageService = require('./message.service');

// routes
router.post('/create', create);
router.get('/', getAll);
router.get('/:id', getById);
router.delete('/:id', _delete);

module.exports = router;



function create(req, res, next) {
    messageService.create(req.body)
        .then(() => res.json({ "message" : "Success!!", "data" : req.body}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    messageService.getAll()
        .then(message => res.json(message))
        .catch(err => next(err));
}

function getById(req, res, next) {
    messageService.getById(req.params.id)
        .then(message => message ? res.json(message) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    messageService.update(req.params.id, req.body)
        .then(() => res.json({"message": "Success on updateing message " + req.params.id, "update" : req.body}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    messageService.delete(req.params.id)
        .then(() => res.json({ "message": "Success Full Deleteion of " + req.params.id }))
        .catch(err => next(err));
}