import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import connectDB from './connectDB.js';

const app = express();
app.use(express.json());
connectDB();

const secret = 'secrettohide';
const AuctionSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "Seller" },
  startingPrice: Number,
  currentPrice: Number,
  bids: Object,
  time: Number,
  status: String,
  winner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
const Auction = mongoose.model('Auction', AuctionSchema);