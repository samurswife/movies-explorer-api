const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { Unauthorized } = require('../errors/index');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  email: {
    unique: true,
    required: true,
    type: String,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Пожалуйста, введите адрес электронной почты!',
    }
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized('Неправильные логин или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Unauthorized('Неправильные логин или пароль');
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);

