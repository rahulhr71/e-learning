const express = require("express");
const { upload } = require("../config/cloudinary");
const { uploadVideo } = require("../controllers/videoController");

const router = express.Router();


router.post("/upload", upload.single("video"), uploadVideo);
router.get("/getvideos/:id", require("../controllers/videoController").getVideosByCourse);
module.exports = router;
