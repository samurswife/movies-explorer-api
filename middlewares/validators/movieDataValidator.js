const { celebrate, Joi } = require('celebrate');

const movieDataValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().messages({ 'any.required': 'Поле country обязательно для заполнения' }),
    director: Joi.string().required().messages({ 'any.required': 'Поле director обязательно для заполнения' }),
    duration: Joi.number().positive().required().messages({
      'number.positive': 'Поле duration должно быть положительным числом',
      'any.required': 'Поле duration обязательно для заполнения',
    }),
    year: Joi.string().required().messages({ 'any.required': 'Поле year обязательно для заполнения' }),
    description: Joi.string().required().messages({ 'any.required': 'Поле description обязательно для заполнения' }),
    image: Joi.string().pattern(/^https?:\/\/([\da-z-]+)\.([a-z]{2,6})\S*/i).required().messages({
      'any.required': 'Поле image обязательно для заполнения',
      'string.pattern.base': 'Введите ссылку в поле image',
    }),
    trailer: Joi.string().pattern(/^https?:\/\/([\da-z-]+)\.([a-z]{2,6})\S*/i).required().messages({
      'any.required': 'Поле trailer обязательно для заполнения',
      'string.pattern.base': 'Введите ссылку в поле trailer',
    }),
    thumbnail: Joi.string().pattern(/^https?:\/\/([\da-z-]+)\.([a-z]{2,6})\S*/i).required().messages({
      'any.required': 'Поле thumbnail обязательно для заполнения',
      'string.pattern.base': 'Введите ссылку в поле thumbnail',
    }),
    nameRU: Joi.string().required().messages({ 'any.required': 'Поле nameRU обязательно для заполнения' }),
    nameEN: Joi.string().required().messages({ 'any.required': 'Поле nameEN обязательно для заполнения' }),
    movieId: Joi.number().positive().required().messages({
      'number.positive': 'Поле movieId должно быть положительным числом',
      'any.required': 'Поле movieId обязательно для заполнения',
    }),
  }),
});

module.exports = movieDataValidator;
