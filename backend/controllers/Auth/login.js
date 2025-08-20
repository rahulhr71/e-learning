const User = require('../../model/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { validateLogin } = require('../../Services/validatins')

const login = async (req, res, next) => {
  const payload = { id: "rahul" }
  const secret = 'rahul'
  const token = jwt.sign(payload, secret, { expiresIn: '1d' })
  const {err,value} = await validateLogin.validateAsync(req.body)
  const {email, password} = req.body;
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  
  
  if (err) {
    return res.status(400).json({ "error:":err })
  }

  try {
    const user1 = await User.findOne({ email: email })
    if (!user1) {
      return res.status(404).json({ message: "user not found", success: false, })
    }
    const rs = await bcrypt.compare(password, user1.password)
    if (!rs) {
      return res.status(401).json({ message: "wrong password", success: false, })
    }
    
    return res.status(200).json({ message: "login success", success: true,token,  email: user1.email })

  } catch (error) {
    next(error)
    console.log(error)
  }
}
module.exports = login;