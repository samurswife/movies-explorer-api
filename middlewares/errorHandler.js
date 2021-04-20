const { isCelebrateError } = require('celebrate');

const errorHandler = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    res.status(400).send({ message: `Ошибка: ${err.details.get('params') ? err.details.get('params').message : err.details.get('body')}` });
    return;
  }

  if (err.status) {
    res.status(err.status).send({ message: err.message });
    return;
  }

  if (err.name === 'CastError') {
    res.status(400).send({ message: 'Невалидный ID ресурса' });
    return;
  } if (err.name === 'ValidationError') {
    res.status(400).send({ message: `Введены некорректные данные: ${err}` });
    return;
  }
  res.status(500).send({ message: `Ошибка: ${err.message}` });
  next();
};

module.exports = errorHandler;
