const jwt = require('jsonwebtoken');
const User = require('../models/user')
const responseHandler = require('../models/ResponseHandler')

const generateToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
  };

  const login = async (req, res) => {
    const username = req.body.username;
   // const user = { name: username };
    await User.login(res, username, password)
    const accessToken = generateToken(user);
    res.json({ accessToken });
  };
  
  const register = async (req, res) => {
    const { username, password, name, email } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
      let user = new User(null, username, password, name, email )
      await user.crear(res)
      return responseHandler.created(res, user, "Usuario creado con Exito!", 201)

}
  module.exports = { login, register, generateToken };