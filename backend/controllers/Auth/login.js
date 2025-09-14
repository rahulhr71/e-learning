const User = require('../../model/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { validateLogin } = require('../../Services/validatins')

const login = async (req, res, next) => {
  try {
    // Validate request body
    const { error, value } = await validateLogin.validateAsync(req.body)
    
    if (error) {
      return res.status(400).json({ 
        message: "Validation error", 
        success: false,
        error: error.details[0].message 
      })
    }

    const { email, password } = req.body
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress

    // Find user by email
    const user = await User.findOne({ email: email })
    
    if (!user) {
      return res.status(404).json({ 
        message: "User not found", 
        success: false 
      })
    }

   
    const isPasswordValid = await bcrypt.compare(password, user.password)
    
    if (!isPasswordValid) {
      return res.status(401).json({ 
        message: "Invalid password", 
        success: false 
      })
    }


    const payload = { 
      id: user._id,
      email: user.email,
   
    }
    
    const secret = process.env.JWT_SECRET || 'your-secret-key' 
    const token = jwt.sign(payload, secret, { expiresIn: '7d' })

    const userResponse = {
      _id: user._id,
      username: user.username || user.name, 
      email: user.email,
  
      createdAt: user.createdAt,
   
    }

    console.log(`User logged in: ${user.email} from IP: ${ip}`)

 
    return res.status(200).json({
      message: "Login successful",
      success: true,
      token: token,
      user: userResponse 
    })

  } catch (error) {
    console.error('Login error:', error)
    next(error)
  }
}

module.exports = login