const validateBody = require('./validationMiddlewares');
const auth = require('./auth');
const upload = require('./upload');
const checkRole = require('./checkRole');

module.exports = {
  validateBody,
  auth,
  upload,
  checkRole,
};
