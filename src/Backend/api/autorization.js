import jwt from 'jsonwebtoken';
import express from 'express';
import connectDB from '../connectDB.js';

const app = express();
app.use(express.json());
connectDB();
const secret = 'secrettohide';

async function authorization(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, secret);
    const founded = await User.findOne({ email: email, password: password });
    return true;
  } catch (e) {
    res.status(401).send("Invalid Token");
  }
}
