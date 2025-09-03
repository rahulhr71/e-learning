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
const courseValidation=joi.object({
  name:joi.string().min(3).max(50).required(),
  category:joi.string().required().min(3),
  teacher:joi.string().min(3).required(),
  weeks:joi.number().required(),
  students:joi.number().required(),
  basePrice:joi.number().required(),
  discountPrice:joi.number().required(),
  thumbnail:joi.string().required(),
  lessons:joi.number().required(),

})
module.exports={validationRegister,validateLogin,courseValidation}
