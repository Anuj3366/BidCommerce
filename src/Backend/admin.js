import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import connectDB from './connectDB.js';

const app = express();
app.use(express.json());
connectDB();

const secret = 'secrettohide';
const AdminSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  moderaters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Moderator" }],
});
const Admin = mongoose.model('Admin', AdminSchema);