const { celebrate, Joi } = require('celebrate');

const userDataValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Поле "Имя" должно содержать минимум 2 символа',
        'string.max': 'Поле "Имя" должно содержать максимум 30 символов',
      }),
    email: Joi.string().email()
      .messages({
        'string.email': 'Введите адрес электронной почты',
      }),
  }),
});

module.exports = userDataValidator;
