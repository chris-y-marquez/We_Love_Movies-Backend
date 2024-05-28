const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

function list() {
  return knex('theaters')
    .select('*')
    .join(
      'movies_theaters',
      'theaters.theater_id',
      'movies_theaters.theater_id'
    )
    .join('movies', 'movies_theaters.movie_id', 'movies.movie_id')
    .then(
      reduceProperties('theater_id', {
        movie_id: ['movies', null, 'movie_id'],
        title: ['movies', null, 'title'],
        runtime_in_minutes: ['movies', null, 'runtime_in_minutes'],
        rating: ['movies', null, 'rating'],
        description: ['movies', null, 'description'],
        image_url: ['movies', null, 'image_url'],
        is_showing: ['movies', null, 'is_showing'],
      })
    );
}

module.exports = {
    list,
}