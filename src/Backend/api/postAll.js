const Product = require('../Schemas/Product.js');
const express = require('express');
const router = express.Router();
const User = require('../Schemas/Users/user.js');

const authorization = require('./authorization.js');
router.post('/newProduct', authorization, async (req, res) => {
  const { email, password } = req.user;
  const founded = await User.findOne({ email: email, password: password });
  if (founded && founded.userType != 'user' && founded.userType != 'worker') {
    const newProduct = new Product({ ...req.body});
    const saved = await newProduct.save();
    res.json(saved);
  }
  else {
    console.log("Invalid access");
    res.status(403).send("Invalid access");
  }
});

router.post('/product/:productID/comment', authorization, async (req, res) => {
  console.log(req.user);
    const { productID } = req.params;
    const { comment } = req.body;
    const product = await Product({ _id: productID });
    product.comments.push(comment);
    const saved = await product.save();
    res.json(saved);
});

module.exports = router;
