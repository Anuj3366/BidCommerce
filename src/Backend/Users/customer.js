import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import connectDB from '../connectDB.js';

const app = express();
app.use(express.json());
connectDB();

const secret = 'secrettohide';
const CustomerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  address: String,
  cart:Object,
  orders:Object,
  wishlist:Object,
});
const Customer = mongoose.model('Customer', CustomerSchema);


