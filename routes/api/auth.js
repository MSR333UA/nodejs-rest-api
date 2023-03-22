const express = require('express');
const authController = require('../../controllers/authController');
const {ctrlWrapper} = require('../../helpers');
const {auth} = require('../../middlewares');
// const validateBody = require("../../middlewares/validationMiddlewares");
// const { registerSchema } = require("../../schemas/schema");
// eslint-disable-next-line new-cap
const router = express.Router();

router.post(
    '/register',
    // validateBody(registerSchema),
    ctrlWrapper(authController.registration),
);
router.post('/login', ctrlWrapper(authController.login));

router.get('/logout', auth, ctrlWrapper(authController.logout));

module.exports = router;
