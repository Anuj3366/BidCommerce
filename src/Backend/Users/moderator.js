import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import connectDB from '../connectDB.js';

const app = express();
app.use(express.json());
connectDB();

const secret = 'secrettohide';
const ModeratorSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  sellerToVerify: [{ type: mongoose.Schema.Types.ObjectId, ref: "Seller" }],
  workerToVerify: [{ type: mongoose.Schema.Types.ObjectId, ref: "Worker" }],
});
const Moderator = mongoose.model('Moderator', ModeratorSchema);