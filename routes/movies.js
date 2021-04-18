const router = require('express').Router();
const { getMovies, addMovie, deleteMovie } = require('../controllers/movies');
const { movieDataValidator } = require('../middlewares/validators/index');

router.get('/', getMovies);
router.post('/', movieDataValidator, addMovie);
router.delete('/:movieId', deleteMovie);

module.exports = router;
