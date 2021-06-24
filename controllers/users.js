const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { Conflict, NotFound } = require('../errors/index');

const { NODE_ENV, JWT_SECRET } = process.env;

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'a835f7f3edcb25a81f3b7607b4838ffa23e20be4cc9f7b3c06a3b52256049ef9',
        { expiresIn: 3600000 * 24 * 7 },
      );
      res.send({ token });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  User.findOne({ email }).then((user) => {
    if (user) {
      throw new Conflict('Ошибка: такой email уже используется.');
    }
    return bcrypt.hash(password, 10);
  })
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'a835f7f3edcb25a81f3b7607b4838ffa23e20be4cc9f7b3c06a3b52256049ef9',
        { expiresIn: 3600000 * 24 * 7 },
      );
      res.send({ token });
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFound('Нет пользователя с таким ID');
    })
    .then((user) => res.send(user))
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;

  User.findOne({ email }).then((user) => {
    if (user._id.toString() !== req.user._id) {
      throw new Conflict('Ошибка: такой email уже используется.');
    } else {
      User.findByIdAndUpdate(
        req.user._id,
        { name, email },
        {
          new: true,
          runValidators: true,
        },
      )
        .orFail(() => {
          throw new NotFound('Нет пользователя с таким ID');
        })
        .then((updatedUser) => res.send(updatedUser));
    }
  })
    .catch(next);
};

module.exports = {
  login,
  createUser,
  getUserInfo,
  updateUserInfo,
};
