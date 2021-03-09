// eslint-disable-next-line strict
exports.up = function (knex) {
  return knex.schema.createTable("movies_theaters", (table) => {
    table.integer("theater_id");
    table.foreign("theater_id").references("theater_id").inTable("theaters");
    table.integer("movie_id");
    table.foreign("movie_id").references("movie_id").inTable("movies");
    table.boolean("is_showing");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("movies_theaters");
};
