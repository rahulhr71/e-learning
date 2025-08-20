const jwt = require('jsonwebtoken');
const User = require('../model/user');
const { validationLogin } = require('../Services/validatins');
const bcrypt = require('bcrypt');

const authenticate=(req, res, next) => {
    const {token}=req.headers;
 
    if (!token) {
        return res.status(401).json({ message: 'No token provided', success: false });
    }
    
    next();

}
module.exports = {authenticate}