import { Product } from "@/Backend/Schemas/Product.js";
import express from 'express';
import connectDB from '../mongoDB.js';
import { authorization } from './autorization.js';
import { User } from '../Schemas/Users/user.js';

const app = express();
app.use(express.json());
connectDB();


app.get('/getAllProduct', authorization, async (req, res) => {
  const products = await Product.find({ bid: false }, null, { sort: { '_id': -1 } });
  res.json(products);
});

app.get('/getAllAuction', authorization, async (req, res) => {
  const { email, password } = req.body;
  const founded = await User.findOne({ email: email, password: password });
  if (founded) {
    const products = await Product.find({ bid: true }, null, { sort: { '_id': -1 } });
    res.json(products);
  }
  else {
    res.status(401).send("Invalid Credentials");
  }
});

app.get('/getAllSeller', authorization, async (req, res) => {
  const { email, password } = req.body;
  const founded = await User.findOne({ email: email, password: password, userType: "moderator" });
  if (founded) {
    const products = await User.find({ wanTo: "seller" }, null, { sort: { '_id': -1 } });
    res.json(products);
  }
  else {
    res.status(401).send("Invalid Credentials");
  }
});

app.get('/getuserType', authorization, async (req, res) => {
  const { email, password } = req.body;
  const founded = await User.findOne({ email: email, password: password });
  if (founded) {
    res.json(founded.userType);
  }
  else {
    res.status(401).send("Invalid Credentials");
  }
});