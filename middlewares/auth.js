const jwt = require('jsonwebtoken');
const {RequestError} = require('../helpers');
const User = require('../models/user');

const auth = async (req, res, next) => {
  try {
    const {authorization = ''} = req.headers;
    const [bearer, token] = authorization.split(' ');
    // console.log({ bearer, token });
    if (bearer !== 'Bearer') throw new RequestError(401, 'Not authorized');

    try {
      const {id} = jwt.verify(token, process.env.TOKEN_KEY);
      const user = await User.findById(id);
      if (!user || !user.token) throw new RequestError(401, 'Not authorized');
      req.user = user;
      req.token = token;
      next();
    } catch (error) {
      throw new RequestError(401, 'Not authorized');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
