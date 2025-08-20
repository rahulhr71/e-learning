const joi = require('joi');
const validationRegister = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    cpassword: joi.any().valid(joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match',
  }),

    
})
const validateLogin=joi.object({
  email:joi.string().email().required(),
  password: joi.string().min(6).required(),
})
module.exports={validationRegister,validateLogin}
