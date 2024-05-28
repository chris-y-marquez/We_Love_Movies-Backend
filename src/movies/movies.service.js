const knex = require("../db/connection")

const mapProperties = require ('../utils/map-properties');


const addCriticDetails = mapProperties({
  critic_id: 'critic.critic_id',
  preferred_name: 'critic.preferred_name',
  surname: 'critic.surname',
  organization_name: 'critic.organization_name',
});


function list(isShowing) {
  if(isShowing) {
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .select("m.*")
        .where({ is_showing: true })
        .groupBy('m.movie_id')
  }
  
  return knex("movies").select("*")
}

function read(movieId) {
  return knex("movies")
        .select("*")
        .where({ movie_id: movieId })
      .first()
}

function listTheatersMovies(movieId) {
  return knex('theaters')
      .join(
    'movies_theaters',
    'movies_theaters.theater_id',
    'theaters.theater_id'
  )
  .where('movies_theaters.movie_id', movieId)
  .select('*')
}

function listTheatersReviews(movieId) {
  return knex ('movies as m')
    .join('reviews as r', ' r.movie_id', 'm.movie_id')
  .join ('critics as c', 'c.critic_id', 'r.critic_id')
  .select('*')
  .where({ 'r.movie_id' : movieId })
  .then((reviews) => {
    const reviewsCriticDetails = [];
    reviews.forEach((review) => {
      const addedCritic = addCriticDetails(review);
      reviewsCriticDetails.push(addedCritic)
    });
    return reviewsCriticDetails
  })
}

module.exports = {
    list,
    read,
    listTheatersMovies,
    listTheatersReviews,
}