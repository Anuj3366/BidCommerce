const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Product = require('../Schemas/Product');
const Order = require('../Schemas/Order');
const authorization = require('./authorization');

router.post('/create-checkout-session',authorization ,async (req, res) => {
  const { productIds } = req.body;
  const products = await Product.find({ _id: { $in: productIds } });
  const line_items = products.map(product => ({
    price_data: {
      currency: 'inr',
      product_data: {
        name: product.title,
      },
      unit_amount: product.bid ? product.bidPrice : product.price ,
    },
    quantity: 1,
  }));
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel',
  });
  const order = new Order({
    line_items,
    paid: false,
  });
  await order.save();
  res.json({ sessionId: session.id });
});
module.exports = router;
