const express = require('express');
const {ctrlWrapper} = require('../../helpers');
const authController = require('../../controllers/authController');
const {validateBody} = require('../../middlewares');
const {resendVerificationSchema} = require('../../schemas/schema');

const router = new express.Router();

router.get(
    '/users/verify/:verificationToken',
    ctrlWrapper(authController.verify),
);

router.post(
    '/users/verify',
    validateBody(resendVerificationSchema),
    ctrlWrapper(authController.resendVerificationEmail),
);

module.exports = router;
