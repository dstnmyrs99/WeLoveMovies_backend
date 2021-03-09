/* eslint-disable strict */
const router = require('express').Router({ mergeParams: true });
const controller = require('./reviewsController');
const methodNotAllowed = require('../errors/methodNotAllowed');

router.route('/:reviewId').put(controller.update).delete(controller.delete).put(controller.update).all(methodNotAllowed);

module.exports = router;
