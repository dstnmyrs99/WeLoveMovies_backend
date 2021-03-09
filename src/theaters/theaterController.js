/* eslint-disable strict */
const knex = require("../db/connection");
const service = require("./theaterService");
const Treeize = require("treeize");

const list = async (req, res, next) => {
  const theaters = await service.list(knex);
  const tree = new Treeize();
  tree.grow(theaters);
  const theaterList = tree.getData();
  res.json({ data: theaterList });
};

module.exports = { list };
