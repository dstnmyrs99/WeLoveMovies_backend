/* eslint-disable strict */

const list = (knex) => {
  return knex("movies as m")
    .select(
      "m.movie_id",
      "m.title",
      "m.runtime_in_minutes",
      "m.rating",
      "m.description",
      "m.image_url",
      "r.review_id as reviews:id",
      "r.content as reviews:content",
      "r.score as reviews:score",
      "r.critic_id as reviews:critic_id",
      "r.movie_id as reviews:movie_id",
      "mt.is_showing"
    )
    .join("reviews as r", "m.movie_id", "r.movie_id")
    .join ("movies_theaters as mt", "mt.movie_id", "m.movie_id");
};

const isShowing = (knex) => {
  return knex("movies as m")
    .select(
      "m.movie_id",
      "m.title",
      "m.runtime_in_minutes",
      "m.rating",
      "m.description",
      "m.image_url",
      "r.review_id as reviews:id",
      "r.content as reviews:content",
      "r.score as reviews:score",
      "r.critic_id as reviews:critic_id",
      "r.movie_id as reviews:movie_id",
      "mt.is_showing"
    )
    .join("reviews as r", "m.movie_id", "r.movie_id")
    .join ("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .where({ "mt.is_showing": true });
};

const read = (knex, id) => {
  return knex("movies").select("*").where({ movie_id: id });
};

const listTheaters = (knex, id) => {
  return knex("movies as m")
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .join("theaters as t", "t.theater_id", "mt.theater_id")
    .where({ "m.movie_id": id });
};

const reviews = (knex, id) => {
  return knex("reviews as r")
    .select(
      "r.review_id",
      "r.content",
      "r.score",
      "r.critic_id",
      "r.movie_id",
      "c.critic_id as critic:critic_id",
      "c.preferred_name as critic:preferred_name",
      "c.surname as critic:surname",
      "c.organization_name as critic:organization_name"
    )
    .join("critics as c", "c.critic_id", "r.critic_id ")
    .where({ "r.movie_id": id });
};
module.exports = {
  list,
  isShowing,
  read,
  listTheaters,
  reviews,
};
