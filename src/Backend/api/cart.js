const { Product } = require('../Schemas/Product.js');
const { User } = require('../Schemas/Users/user.js');
const express = require('express');
const router = express.Router();
const authorization = require('./authorization.js');

router.post('/addToCart', authorization, async (req, res) => {
  const productId = req.body.productId;
  const product = await Product.findById(productId);
  const cart = founded.cart;
  cart.push(product);
  const updated = await User.updateOne({ email: email, password: password }, { cart: cart });
  res.json(updated);
});
router.get('/getCart', authorization, async (req, res) => {
  res.json(founded.cart);
});

module.exports = router;