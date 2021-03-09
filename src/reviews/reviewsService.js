/* eslint-disable strict */

const read = (knex, id) => {
  return knex("reviews").select("*").where({ review_id: id });
};

const destroy = (knex, id) => {
  return knex("reviews").select("*").where({ review_id: id }).del();
};

const update = (knex, id, body) => {
  return knex("reviews").select("*").where({ review_id: id }).update(body, "*");
};

const review = (knex, id) => {
  return knex("reviews as r")
    .select(
      "r.review_id",
      "r.content",
      "r.score",
      "r.critic_id",
      "r.movie_id",
      "r.created_at",
      'r.updated_at',
      "c.critic_id as critic:critic_id",
      "c.preferred_name as critic:preferred_name",
      "c.surname as critic:surname",
      "c.organization_name as critic:organization_name"
    )
    .join("critics as c", "c.critic_id", "r.critic_id ")
    .where({ "r.review_id": id });
};

module.exports = {
  read,
  destroy,
  update,
  review,
};
