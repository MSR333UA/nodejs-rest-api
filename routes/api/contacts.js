const express = require("express");
const contactsController = require("../../controllers/contactsController");
const { ctrlWrapper } = require("../../helpers");
const { auth } = require("../../middlewares");

// eslint-disable-next-line new-cap
const router = express.Router();

router.use(auth);
router.get("/", ctrlWrapper(contactsController.getAll));
router.get("/:contactId", ctrlWrapper(contactsController.getById));
router.post("/", ctrlWrapper(contactsController.getPost));
router.delete("/:contactId", ctrlWrapper(contactsController.deleteById));
router.put("/:contactId", ctrlWrapper(contactsController.updateById));
router.patch(
  "/:contactId/favorite",
  ctrlWrapper(contactsController.updateStatusContact)
);

module.exports = router;
