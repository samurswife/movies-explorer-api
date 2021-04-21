const { celebrate, Joi } = require('celebrate');

const registerValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': 'Минимум 2 символа',
        'string.max': 'Максимум 30 символов',
        'any.required': 'Поле Email обязательно для заполнения',
      }),
    email: Joi.string().email().required()
      .messages({
        'string.email': 'Введите адрес электронной почты',
        'any.required': 'Поле Email обязательно для заполнения',
      }),
    password: Joi.string().min(8).max(30).required()
      .messages({
        'string.min': 'Пароль должен содержать минимум 8 символов',
        'string.max': 'Пароль должен содержать максимум 30 символов',
        'any.required': 'Поле "Пароль" обязательно для заполнения',
      }),
  }),
});

module.exports = registerValidator;
