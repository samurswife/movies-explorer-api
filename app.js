require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { PORT = 3000, NODE_ENV, DB } = process.env;

const { NotFound } = require('./errors/index');
const errorHandler = require('./middlewares/errorHandler');
const routerUsers = require('./routes/users');
const routerMovies = require('./routes/movies');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { signin, signup } = require('./middlewares/validators/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(helmet());

mongoose.connect(NODE_ENV === 'production' ? DB : 'mongodb://localhost:27017/dev-bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/signup', signup, createUser);
app.post('/signin', signin, login);

app.use('/users', auth, routerUsers);
app.use('/movies', auth, routerMovies);
app.use('/', () => {
  throw new NotFound('Запрашиваемый ресурс не найден');
});

app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
