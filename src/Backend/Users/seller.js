import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import connectDB from '../connectDB.js';

const app = express();
app.use(express.json());
connectDB();

const secret = 'secrettohide';
const SellerSchema = new mongoose.Schema({
  shopname: String,
  shopemail: String,
  password: String,
  verified: Boolean,
  GSTINnumber: String,
  PANnumber: String,
  selling: Object,
  address: String,
  orders: Object,
  totalSold: Number,
  monthlySold: Number,
});
const Seller = mongoose.model('Seller', SellerSchema);
