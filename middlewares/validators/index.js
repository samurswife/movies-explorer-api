const signin = require('./loginValidator');
const signup = require('./registerValidator');
const userDataValidator = require('./userDataValidator');
const movieDataValidator = require('./movieDataValidator');

module.exports = {
  signin,
  signup,
  userDataValidator,
  movieDataValidator,
};
