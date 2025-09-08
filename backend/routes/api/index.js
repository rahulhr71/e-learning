const router = require('express').Router();
const authRoutes = require("./Auth.route");
const dashboard=require("./dashboard")
const user=require("./users");
const deleteuser=require("./deleteuser");
const courseRoute=require('../courses/index')
const videoRoute=require('../videoRoutes')
const notesRoute=require('./notes')
router.use("/dashboard",dashboard );
router.use("/auth",authRoutes)
router.use("/users", user);
router.use("/deleteuser", deleteuser);
router.use("/courses",courseRoute);
router.use("/notes",notesRoute);
router.use("/videos",videoRoute);

module.exports = router;