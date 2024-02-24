const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const connectDB = require('./mongoDB.js');

const app = express();
app.use(express.json());
connectDB();

const secret = 'secrettohide';
const ItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "Seller" },
  category: Object,
  description: String,
  image: String,
  rating: Number,
  reviews: Object,
  sold: Number,
});
const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;
