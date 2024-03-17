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
    res.json({ message: "Comment added", comment: commentObj });
  }
});

router.post('/product/:id/bid', authorization ,async (req, res) => {
  const { id } = req.params;
  const { bid } = req.body;
  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  if (product.price >= bid) {
    return res.status(400).json({ message: "Bid must be higher than current price" });
  }
  product.price = bid;
  product.bidders.push(req.user.email);
  await product.save();
  res.json({ message: "Bid placed" });
});


module.exports = router;