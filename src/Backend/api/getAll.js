const express = require('express');
const router = express.Router();
const Product = require('../Schemas/Product.js');
const connectDB = require('../mongoDB.js');
const User = require('../Schemas/Users/user.js');

connectDB();
const authorization  = require('./authorization.js');
router.get('/getAllProduct', authorization, async (req, res) => {
  const products = await Product.find({ bid: false }, null, { sort: { '_id': -1 } });
  res.json(products);
});


router.get('/getAllAuction', authorization, async (req, res) => {
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

router.get('/getAllSeller', authorization, async (req, res) => {
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

router.get('/getuserType', authorization, async (req, res) => {
  const { email, password } = req.body;
  const founded = await User.findOne({ email: email, password: password });
  if (founded) {
    res.json(founded.userType);
  }
  else {
    res.status(401).send("Invalid Credentials");
  }
});
console.log("getAll.js");
module.exports = router;