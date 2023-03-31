const express = require('express');

const {ctrlWrapper} = require('../../helpers');
const filesController = require('../../controllers/filesController');
const {upload, auth} = require('../../middlewares');

const router = new express.Router();

// uppload.array('avatar', 8)
// uppload.fields([{name: 'avatar', maxCount: 8, {name: 'cover', maxCount:1}}])
router.patch(
    '/avatars',
    upload.single('avatar'),
    auth,
    ctrlWrapper(filesController.avatars),
);

// router.get("/", async (req, res) => {
//   res.json(avatars);
// });

module.exports = router;
