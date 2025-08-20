const express = require('express');
const user = express.Router();
const {userController } = require('../../controllers/users');
const { authenticate } = require('../../middlewares/auth');
user.get('/',authenticate,userController);

module.exports = user;