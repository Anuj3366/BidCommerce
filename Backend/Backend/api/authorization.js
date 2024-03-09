const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../Schemas/Users/customers.js');

const secret = 'secrettohide';

async function authorization(req, res, next) {
  if(!req.cookies.jwt) return res.status(401).json({ error: 'Authorization failed', redirectToLogin: true });
  const token = req.cookies.jwt.split(' ')[1];
  try {
    const decoded = jwt.verify(token, secret);
    const user = await User.findOne({ email: decoded.email });
    if (user && bcrypt.compareSync(decoded.password, user.password)) {
      req.user = user;
      next();
    } else {
      res.status(401).json({ error: 'Authorization failed', redirectToLogin: true });
    }
  } catch (e) {
    res.status(401).json({ error: 'Authorization failed', redirectToLogin: true });
  }
}


module.exports = authorization;
