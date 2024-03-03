const express = require('express');
const router = express.Router();
const authorization = require('./authorization.js');
const Product = require('../Schemas/Product.js');
const User = require('../Schemas/Users/customers.js');
const mongoose = require('mongoose');

router.post('/addToCart', authorization, async (req, res) => {
  const customer = req.user;
  const foundUser = await User.findOne({ email: customer.email, password: customer.password });
  if (!foundUser) {
    return res.status(404).json({ message: 'User not found' });
  }
  const productId = req.body.productId;
  const product = await Product.findOne({_id:productId});
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  foundUser.cart.push(product);
  await foundUser.save();
  await Product.updateOne({ _id: productId }, { $inc: { buyed: 1 } });
  res.json({ message: 'Added to cart' });
});

router.get('/getCart', authorization, async (req, res) => {
  const customer = req.user;
  const foundUser = await User.findOne({ email: customer.email, password: customer.password });
  if (!foundUser) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(foundUser.cart);
});

router.post('/removeFromCart', authorization, async (req, res) => {
  const productId = req.body.productId;
  const customer = req.user;
  const foundUser = await User.findOne({ email: customer.email, password: customer.password });
  if (!foundUser) {
    return res.status(404).json({ message: 'User not found' });
  }
  const updatedCart = foundUser.cart.filter(item => item._id.toString() !== productId);
  foundUser.cart = updatedCart;
  await foundUser.save();
  res.json({ message: 'Removed from cart' });
});

module.exports = router;