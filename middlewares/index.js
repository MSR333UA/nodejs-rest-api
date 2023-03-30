const validateBody = require("./validationMiddlewares");
const auth = require("./auth");
const upload = require("./upload");

module.exports = {
  validateBody,
  auth,
  upload,
};
