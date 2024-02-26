const stripe = require('stripe')(process.env.STRIPE_SK);
const buffer = require('micro');
const Order = require('../Order');

const endpointSecret = "whsec_634d3142fd2755bd61adaef74ce0504bd2044848c8aac301ffdb56339a0ca78d";

module.exports = async function handler(req, res) {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  switch (event.type) {
    case 'checkout.session.completed':
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === 'paid';
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId, {
          paid: true,
        })
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send('ok');
}

module.exports.config = {
  api: { bodyParser: false, }
};
