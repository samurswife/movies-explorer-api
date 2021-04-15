/* eslint-disable no-unused-vars */

const { isCelebrateError } = require('celebrate');

const errorHandler = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    return res.status(400).send({ message: `Ошибка: ${err.details.get('params') ? err.details.get('params').message : err.details.get('body')}` });
  }

  if (err.status) {
    return res.status(err.status).send({ message: err.message });
  }

  if (err.name === 'CastError') {
    return res.status(400).send({ message: 'Невалидный ID ресурса' });
  } if (err.name === 'ValidationError') {
    return res.status(400).send({ message: `Введены некорректные данные: ${err}` });
  }
  return res.status(500).send({ message: `Ошибка: ${err.message}` });
};

module.exports = errorHandler;
