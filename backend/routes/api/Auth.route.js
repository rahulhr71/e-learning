const router = require("express").Router();
const login=require('../../controllers/Auth/login')
const register = require("../../controllers/Auth/register");
router.post("/register",register)
router.post("/login",login)
module.exports = router; 