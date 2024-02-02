import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import connectDB from './connectDB.js';

const app = express();
app.use(express.json());
connectDB();

const secret = 'secrettohide';
const WorkerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  adhaar: String,
  orders:Object,
  totalDelivered: Number,
  employTiming: Number,
  monthlyEarning: Number,
});
const Worker = mongoose.model('Worker', WorkerSchema);
