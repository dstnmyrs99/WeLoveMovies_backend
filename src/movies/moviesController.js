/* eslint-disable strict */
const knex = require("../db/connection");
const service = require("./moviesService");
const Treeize = require("treeize");

const list = async (req, res, next) => {
  const tree = new Treeize();
  const is_showing = req.query.is_showing
  try {
    const movieList = is_showing
      ? await service.isShowing(knex)
      : await service.list(knex);
 
    tree.grow(movieList);
    const reviewed = tree.getData();
    res.json({ data: reviewed });
  } catch (err) {
    console.error(err);
  }
};

const read = async (req, res, next) => {
  const id = Number(req.params.movieId);
  try {
    const movie = await service.read(knex, id);
    res.json({ data: movie[0] });
  } catch (err) {
    console.error(err);
  }
};

const exists = async (req, res, next) => {
  const id = Number(req.params.movieId);
  try {
    const movie = await service.read(knex, id);
    if (movie.length) return next();
    next({ status: 404, message: "Movie cannot be found" });
  } catch (err) {
    console.error(err);
  }
};

const listTheaters = async (req, res, next) => {
  try {
    const theaters = await service.listTheaters(
      knex,
      Number(req.params.movieId)
    );
    res.json({ data: theaters });
  } catch (err) {
    console.error(err);
  }
};

const listReviews = async (req, res, next) => {
  const reviewTree = new Treeize();
  try {
    const reviews = await service.reviews(knex, req.params.movieId);
    reviewTree.grow(reviews);
    const list = reviewTree.getData();
    res.json({ data: list });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  list,
  read: [exists, read],
  listTheaters,
  listReviews,
};
