const mongoose = require('mongoose');
const Product = require('../Product');
const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  cart: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number
  }],
  orders: Object,
  wishlist: Object,
  userType: { type: String, enum: ['user', 'seller', 'worker', 'moderator', 'admin', 'notverified'] },
});

const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;