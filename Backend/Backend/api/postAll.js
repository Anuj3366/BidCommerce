const express = require('express');
const router = express.Router();
const authorization = require('./authorization.js');
const Product = require('../Schemas/Product.js');
const User = require('../Schemas/Users/customers.js');
const Seller = require('../Schemas/Users/seller.js');
const mongoose = require('mongoose');


router.post('/product/:productID/comment', authorization, async (req, res) => {
  const { email, password } = req.user;
  const founded = await User.findOne({ email: email, password: password });
  if (founded){
    console.log(req.user);
    const { productID } = req.params;
    const { comment } = req.body;
    const product = await Product({ _id: productID });
    product.comments.push(comment);
    const saved = await product.save();
    res.json(saved);
  }
});

module.exports = router;
