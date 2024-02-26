const jwt = require('jsonwebtoken');

const secret = 'secrettohide';

async function authorization(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ error: 'Authorization failed', redirectToLogin: true });
  }
}

module.exports = authorization;
