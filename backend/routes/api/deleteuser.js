const router = require("express").Router();
const { deleteUserController } = require("../../controllers/deleteUserController");
const { authenticate } = require("../../middlewares/auth");
router.delete("/", authenticate, deleteUserController);

module.exports = router;
