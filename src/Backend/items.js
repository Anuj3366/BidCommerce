import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import connectDB from './connectDB.js';

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