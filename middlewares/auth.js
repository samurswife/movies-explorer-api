const jwt = require('jsonwebtoken');
const { Forbidden, Unauthorized } = require('../errors/index');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Forbidden('Необходима авторизация.');
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'a835f7f3edcb25a81f3b7607b4838ffa23e20be4cc9f7b3c06a3b52256049ef9',
    );
  } catch (err) {
    throw new Unauthorized('Переданы неверные данные при авторизации.');
  }

  req.user = payload;

  next();
};
