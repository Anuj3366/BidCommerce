const express = require('express');
const router = express.Router();
const Order = require('../Schemas/Order');
const stripe = require('stripe')(process.env.STRIPE_SK);

const endpointSecret = "whsec_634d3142fd2755bd61adaef74ce0504bd2044848c8aac301ffdb56339a0ca78d";

router.use(express.json({
  verify: function(req, res, buf) {
    req.rawBody = buf.toString();
  }
}));

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

module.exports = router;
