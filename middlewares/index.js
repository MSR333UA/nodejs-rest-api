const validateBody = require('./validationMiddlewares');
const auth = require('./auth');

module.exports = {
  validateBody,
  auth,
};
