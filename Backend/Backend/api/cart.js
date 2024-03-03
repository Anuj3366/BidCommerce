const express = require('express');
const router = express.Router();
const authorization = require('./authorization.js');
const { Product } = require('../Schemas/Product.js');
const { User } = require('../Schemas/Users/user.js');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

router.post('/addToCart', authorization, async (req, res) => {
  const productId = req.body.productId;
  console.log("productId", productId);
  const product = await Product.findById(ObjectId(productId));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  const user = req.user;
  const foundUser = await User.findById(user._id);
  if (!foundUser) {
    return res.status(404).json({ message: 'User not found' });
  }
  foundUser.cart.push(product);
  await foundUser.save();
  await Product.updateOne({ _id: productId }, { $inc: { buyed: 1 } });

  res.json({ message: 'Added to cart' });
});

router.get('/getCart', authorization, async (req, res) => {
  const user = req.user;
  const foundUser = await User.findById(user._id);
  if (!foundUser) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(foundUser.cart);
});

router.post('/removeFromCart', authorization, async (req, res) => {
  const productId = req.body.productId;
  const user = req.user;
  const foundUser = await User.findById(user._id);
  if (!foundUser) {
    return res.status(404).json({ message: 'User not found' });
  }
  const updatedCart = foundUser.cart.filter(item => item._id.toString() !== productId);
  foundUser.cart = updatedCart;
  await foundUser.save();

  res.json({ message: 'Removed from cart' });
});


module.exports = router;
