/* eslint-disable strict */
const router = require("express").Router({ mergeParams: true });
const controller = require("./moviesController");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.list).all(methodNotAllowed);

router
  .route("/:movieId/theaters")
  .get(controller.listTheaters)
  .all(methodNotAllowed);

router
  .route("/:movieId/reviews")
  .get(controller.listReviews)
  .all(methodNotAllowed);

router.route("/:movieId").get(controller.read).all(methodNotAllowed);

module.exports = router;
