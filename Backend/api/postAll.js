const express = require('express');
const router = express.Router();
const authorization = require('./authorization.js');
const Product = require('../Schemas/Product.js');


router.post('/product/:productID/comment', authorization, async (req, res) => {
  const founded = req.user;
  if (founded) {
    console.log(req.user);
    const { productID } = req.params;
    const { comment } = req.body;
    const product = await Product.findOne({ _id: productID });
    if (!product) {
      console.error(`Product not found: ${productID}`);
      return res.status(404).json({ error: 'Product not found' });
    }
    const commentObj = {
      user: founded._id,
      comment: comment,
    };
    product.comments.push(commentObj);
    const saved = await product.save();
    res.json(saved);
  }
});



module.exports = router;