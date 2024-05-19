const express = require('express');
const router = express.Router();
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../Schemas/Order');
const User = require('../Schemas/Users/customers.js');
const authorization = require('./authorization');

router.post('/checkout', authorization, async (req, res) => {
  const { address, products } = req.body;
  const customer = req.user;
  const foundUser = await User.findOne({ email: customer.email, password: customer.password });
  if (!foundUser) {
    return res.status(404).json({ message: 'User not found' });
  }
  const name = foundUser.name;
  const email = foundUser.email;
  const orderAddress = address || foundUser.address;
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
  
  const order = new Order({
    name,
    email,
    address: orderAddress,
    line_items,
    paid: false,
  });
  await order.save();
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    success_url: 'http://localhost:1234/success',
    cancel_url: 'http://localhost:1234/cancel',
    metadata: { orderId: order._id.toString() },
  });

  foundUser.orders.push(order._id);
  await foundUser.save();

  res.json({ message: 'Order placed', url: session.url });
});


router.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const orderId = session.metadata.orderId;
    const paid = session.payment_status === 'paid';

    if (orderId && paid) {
      await Order.findByIdAndUpdate(orderId, { paid: true });
    }
  } else {
    console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send('ok');
});


router.post('/empty-cart', authorization, async (req, res) => {
  const customer = req.user;
  const foundUser = await User.findOne({ email: customer.email, password: customer.password });
  if (!foundUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  foundUser.cart = [];
  await foundUser.save();

  res.json({ message: 'Cart emptied' });
});


module.exports = router;
