// first step 
// we have to validate data of frontend (order) or req data
// second step
// we have to verify data from db etheri it exist or not.
// third step
//Data save in mongo db 
// fourth step
// send response to fronten
const User = require('../../model/user')
const { validationRegister } = require('../../Services/validatins')
const bcrypt = require('bcrypt')

const register = async (req, res, next) => {
  const { err, value } = await validationRegister.validateAsync(req.body)
  if (err) {
    return res.status(400).json({ error: err })
  }

  const { email, password } = req.body;
  async function hashing(pass) {
    const salt = await bcrypt.genSalt()
    const hashedpassword = await bcrypt.hash(pass, salt)
    return hashedpassword
  }
  const ps1 = await hashing(password)
  try {
    const newUser = new User({ email: email, password: ps1 });
    const result = await newUser.save();
    res.status(200).json({ message: "register successfully", success: true, result });

  } catch (err) {
    res.status(400).json({ message: "DB problem", success: false, error: err.message });
  }
}
module.exports = register;