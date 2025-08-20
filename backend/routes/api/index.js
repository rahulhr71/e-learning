const router = require('express').Router();
const authRoutes = require("./Auth.route");
const dashboard=require("./dashboard")
const user=require("./users");
const deleteuser=require("./deleteuser");


router.use("/dashboard",dashboard );
router.use("/auth",authRoutes)
router.use("/users", user);
router.use("/deleteuser", deleteuser);

module.exports = router;