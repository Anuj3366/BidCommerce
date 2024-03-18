const express = require('express');
const router = express.Router();
const Product = require('../Schemas/Product.js');


router.get('/get/:productID', async (req, res) => {
  const productID = req.params.productID;
  const product = await Product.findOne({ '_id':productID });
  res.json(product);
});

router.get('/getAllProduct', async (req, res) => {
  const products = await Product.find({ bid: false }, null, { sort: { '_id': -1 } });
  res.json(products);
});
router.get('/getAll', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.get('/getAllAuction', async (req, res) => {
  const products = await Product.find({ bid: true }, null, { sort: { '_id': -1 } });
  res.json(products);
});

router.get('/product/:productID/comment', async (req, res) => {
  const { productID } = req.params;
  const product = await Product.findOne({ _id: productID });
  res.json(product.comments);
});

module.exports = router;
