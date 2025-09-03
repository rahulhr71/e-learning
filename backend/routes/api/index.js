const router = require('express').Router();
const authRoutes = require("./Auth.route");
const dashboard=require("./dashboard")
const user=require("./users");
const deleteuser=require("./deleteuser");
const courseRoute=require('../courses/index')
const videoRoute=require('../videoRoutes')
router.use("/dashboard",dashboard );
router.use("/auth",authRoutes)
router.use("/users", user);
router.use("/deleteuser", deleteuser);
router.use("/courses",courseRoute);
router.use("/videos",videoRoute);

module.exports = router;