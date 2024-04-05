const express = require('express');
const router = express.Router();
const authorization = require('./authorization.js');
const Product = require('../Schemas/Product.js');
const User = require('../Schemas/Users/customers.js');


router.post('/addToCart', authorization, async (req, res) => {
  const customer = req.user;
  const foundUser = await User.findOne({ email: customer.email });
  const productId = req.body.productId;
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  let item = foundUser.cart.find(item => item.productId.toString() === productId);
  if (item) {
    if(product.quantity >= item.quantity + 1) {
      item.quantity += 1;
      foundUser.markModified('cart');
      await foundUser.save();
      res.json({ message: 'Added to cart' });
    } else {
      res.status(400).json({ message: 'Product out of stock' });
    }
  }
  else {
    if (product.quantity > 0) {
      item = { productId: product._id, quantity: 1 };
      foundUser.cart.push(item);
      await foundUser.save();
      res.json({ message: 'Added to cart' });
    } else {
      res.status(400).json({ message: 'Product out of stock' });
    }
  }
});

router.get('/getCart', authorization, async (req, res) => {
  const customer = req.user;
  const foundUser = await User.findOne({ email: customer.email }).populate('cart.productId');
  if (!foundUser) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(foundUser.cart);
});

router.put('/increaseQuantity', authorization, async (req, res) => {
  const productId = req.body.productId;
  const customer = req.user;
  const foundUser = await User.findOne({ email: customer.email });
  const product = await Product.findOne({ _id: productId });
  if (!product || product.quantity <= 0) {
    return res.status(400).json({ message: 'Product out of stock' });
  }
  const productIdString = String(productId);
  const itemArray = foundUser.cart.filter(item => item.productId.toString() === productIdString);  
  if (itemArray.length === 0) {
    return res.status(404).json({ message: 'Product not found in cart' ,productId});
  }
  const item = itemArray[0];  
  if (product.quantity >= item.quantity + 1) {
    item.quantity += 1;
    foundUser.markModified('cart');
    await foundUser.save();
    return res.json({ message: 'Increased quantity' });
  }
  else {
    return res.status(400).json({ message: 'Product out of stock' });
  }
});

router.put('/decreaseQuantity', authorization, async (req, res) => {
  const productId = req.body.productId;
  const customer = req.user;
  const foundUser = await User.findOne({ email: customer.email });
  const item = foundUser.cart.find(item => item.productId.toString() === productId);
  if (!item) {
    return res.status(404).json({ message: 'Product not found in cart' });
  }
  if (item.quantity === 1) {
    return res.status(400).json({ message: 'Cannot decrease quantity below 1' });
  }
  item.quantity -= 1;
  foundUser.markModified('cart');
  await foundUser.save();
  res.json({ message: 'Decreased quantity' });
});

router.put('/removeFromCart', authorization, async (req, res) => {
  const productId = req.body.productId;
  const customer = req.user;
  const foundUser = await User.findOne({ email: customer.email });
  const item = foundUser.cart.find(item => item.productId.toString() === productId);
  if (!item) {
    return res.status(404).json({ message: 'Product not found in cart' });
  }
  foundUser.cart = foundUser.cart.filter(item => item.productId.toString() !== productId);
  await foundUser.save();
  res.json({ message: 'Removed from cart' });
});

router.post('/topbidder', async (req, res) => {
  const productId = req.body.productId;
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  const topBidder = product.bids[product.bids.length - 1].email;
  const found = await User.findOne({ email: topBidder });
  if (!found) {
    return res.status(404).json({ message: 'User not found' });
  }
  const productExists = found.products.find(product => product.productId.toString() === productId);
  if (productExists) {
    return res.json({ message: 'User already has the product' });
  }
  found.products.push({ productId: productId });
  await found.save();
  return res.json({ message: 'Product added to user' });
});

module.exports = router;