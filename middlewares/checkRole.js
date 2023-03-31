const {RequestError} = require('../helpers');

const checkRole = (role) => {
  const func = (req, res, next) => {
    if (req.user.role !== role) {
      throw new RequestError(403, 'Forbidden resource');
    }
    next();
  };
  return func;
};

module.exports = checkRole;
