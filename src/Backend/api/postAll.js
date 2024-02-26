const Product = require('../Schemas/Product.js');
const express = require('express');
const router = express.Router();
const User = require('../Schemas/Users/user.js');
const { v4: uuidv4 } = require('uuid');

const authorization = require('./authorization.js');
router.post('/newProduct', authorization, async (req, res) => {
  const { email, password } = req.body;
  const founded = await User.findOne({ email: email, password: password });
  if(founded && founded.userType != 'user' && founded.userType != 'worker'){
    const UID = uuidv4();
    const newProduct = new Product({ ...req.body, id: UID.toString() });
    const saved = await newProduct.save();
    res.json(saved);
  }
  else{
    console.log("Invalid access");
    res.status(403).send("Invalid access");
  }
});

module.exports = router;
