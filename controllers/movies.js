const Movie = require('../models/movie');
const { Conflict, NotFound } = require('../errors/index');

const getMovies = (req, res, next) => {
  Movie.find({})
    .populate(['owner'])
    .then((movie) => res.send(movie))
    .catch(next);
};

const addMovie = (req, res, next) => {
  const { country, director, duration, year, description, image, trailer, thumbnail, nameRU, nameEN, movieId } = req.body;
  const user = req.user._id;

  Movie.create({ country, director, duration, year, description, image, trailer, thumbnail, nameRU, nameEN, movieId, owner: user })
    .then((movie) => {
      Movie.findById(movie._id)
        .populate(['owner'])
        .then((newMovie) => res.send(newMovie));
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const { user } = req;

  Movie.findById(movieId)
    .orFail(() => {
      throw new NotFound('Нет фильма с таким ID');
    })
    .populate(['owner'])
    .then((movie) => {
      if (user._id !== movie.owner._id.toString()) {
        throw new Conflict('Вы не можете удалить этот фильм');
      } else {
        Movie.findByIdAndRemove(movieId)
          .then((deletedMovie) => res.send(deletedMovie));
      }
    })
    .catch(next);
};

module.exports = {
  getMovies,
  addMovie,
  deleteMovie
}