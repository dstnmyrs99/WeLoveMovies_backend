// eslint-disable-next-line strict
exports.up = function (knex) {
  return knex.schema.createTable('movies', (table) => {
    table.increments('movie_id');
    table.string('title');
    table.integer('runtime_in_minutes');
    table.string('rating');
    table.text('description');
    table.string('image_url');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('movies');
};
