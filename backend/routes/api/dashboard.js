const {authenticate} =require('../../middlewares/auth');
const express = require('express');
const router = express.Router();
const {dashboardController } = require('../../controllers/dashboard');

router.get('/',authenticate,dashboardController)

module.exports = router;
