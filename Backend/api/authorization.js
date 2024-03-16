const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../Schemas/Users/customers.js');

const secret = 'secrettohide';

async function authorization(req, res, next) {
  if(!req.cookies.jwt){
    // console.log("No token found");
    return res.status(401).json({ error: 'Authorization failed', redirectToLogin: true , message: "No token found"});
  }
  const token = req.cookies.jwt;
  try {
    const decoded = jwt.verify(token, secret);
    const user = await User.findOne({ email: decoded.email });
    if (user && bcrypt.compareSync(decoded.password, user.password)) {
      req.user = user;
      next();
    } else {
      // console.log("User not found");
      res.status(401).json({ error: 'Authorization failed', redirectToLogin: true , message: "User not found"});
    }
  } catch (e) {
    // console.log("Error in jwt verification", e);
    res.status(401).json({ error: 'Authorization failed', redirectToLogin: true , message: "Error in jwt verification"});
  }
}


module.exports = authorization;
