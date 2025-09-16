const router = require("express").Router();
const login=require('../../controllers/Auth/login')
const register = require("../../controllers/Auth/register");
const { adminLogin } =require('../../controllers/Auth/admin')
router.post("/register",register)
router.post("/login",login)
router.post('/admin/login',adminLogin)
module.exports = router; 