const express = require('express');
const router = express.Router();
const Product = require('../Schemas/Product.js');
const User = require('../Schemas/Users/customers.js');

const authorization = require('./authorization.js');
router.get('/getAll/:productID', async (req, res) => {
  const productID = req.params.productID;
  const product = await Product.findOne({ '_id':productID });
  res.json(product);
});
router.get('/getAllProduct', async (req, res) => {
  const products = await Product.find({ bid: false }, null, { sort: { '_id': -1 } });
  res.json(products);
});


router.get('/getAllAuction', async (req, res) => {
  const products = await Product.find({ bid: true }, null, { sort: { '_id': -1 } });
  res.json(products);
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
router.get('/product/:productID/comment', async (req, res) => {
  const { productID } = req.params;
  const product = await Product.findOne({ _id: productID });
  res.json(product.comments);
});
module.exports = router;