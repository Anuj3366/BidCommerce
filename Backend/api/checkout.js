const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../Schemas/Order');
const User = require('../Schemas/Users/customers.js');
const authorization = require('./authorization');

router.post('/checkout', authorization, async (req, res) => {
  const { name, email, address, products } = req.body;
  const customer = req.user;
  const foundUser = await User.findOne({ email: customer.email, password: customer.password });
  if (!foundUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  const line_items = products.map(product => ({
    price_data: {
      currency: 'inr',
      product_data: {
        name: product.title,
      },
      unit_amount: product.bid ? product.bidPrice : product.price ,
    },
    quantity: product.quantity || 1,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    success_url: 'http://localhost:1234/success',
    cancel_url: 'http://localhost:1234/cancel',
  });

  const order = new Order({
    name,
    email,
    address,
    line_items,
    paid: false,
  });

  await order.save();
  res.json({ url: session.url });
});

module.exports = router;