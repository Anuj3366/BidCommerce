const jwt = require('jsonwebtoken');
const express = require('express');
const connectDB = require('../mongoDB.js');

const app = express();
app.use(express.json());
connectDB();

const secret = 'secrettohide';

async function authorization(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).send('Authorization failed');
    next(e);
  }
}

module.exports = authorization;

