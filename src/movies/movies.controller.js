const { move } = require('./movies.router')
const moviesService = require("./movies.service");



async function list(req, res, next) {
    if (req.query.is_showing === 'true') {
      moviesService
        .list(true)
        .then((data) => res.json({ data }))
        .catch(next)
    } else {
            moviesService
            .list()
            .then((data) => res.json({ data }))
      .catch(next)
    } 
}

async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const foundMovies = await moviesService.read(movieId);
  if (foundMovies) {
    res.locals.movie = foundMovies;
    return next();
  }
  return next({ status: 404, message: `Movie id is not found: ${movieId}` });
}

async function read (req, res, next) {
   res.json({ data: res.locals.movie })
}

async function readTheatersMovies (req, res, next) {
  const data = await moviesService.listTheatersMovies ( Number(req.params.movieId)
)
  res.json({data})
}

async function readReviewsMovies(req, res, next) {
  const reviews = await moviesService.listTheatersReviews(
  Number(req.params.movieId));
    res.json({data: reviews })
}

module.exports = {
    list,
    read: [movieExists, read],
    readTheatersMovies,
    readReviewsMovies,
}