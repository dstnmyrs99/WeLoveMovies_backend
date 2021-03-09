/* eslint-disable strict */
const knex = require("../db/connection");
const service = require("./reviewsService");
const Treeize = require("treeize");

const destroy = async (req, res, next) => {
  const id = req.params.reviewId;
  const deleted = await service.destroy(knex, id);
  res.sendStatus(204);
};

const exists = async (req, res, next) => {
  const id = Number(req.params.reviewId);
  const found = await service.read(knex, id);
  if (found.length) return next();
  next({ status: 404, message: "Review cannot be found." });
};

const update = async (req, res, next) => {
  const tree = new Treeize();
  const body = req.body.data;
  const id = Number(req.params.reviewId);
  const updated = await service.update(knex, id, body);
  const returned = await service.review(knex, id);
  tree.grow(returned);
  const newUpdate = tree.getData();
  res.json({ data: newUpdate[0] });
};

module.exports = {
  delete: [exists, destroy],
  update: [exists, update],
};
