import { Product } from "@/Backend/Schemas/Product.js";
import express from 'express';
import connectDB from '../mongoose.js';
import {authorization} from './autorization.js';
import {User} from '../Schemas/Users/user.js';
import {v4 as uuidv4} from 'uuid';

const app = express();
app.use(express.json());
connectDB();


app.post('/newProduct', authorization, async (req, res) => {
  const { email, password } = req.body;
  const founded = await User.findOne({ email: email, password: password });
  if(founded.userType != "user" && founded.userType != "worker"){
    const UID = uuidv4();
    newProduct.id = UID.toString();
    const newProduct = new Product(req.body);
    const saved = await newProduct.save();
    res.json(saved);
  }
  else{
    res.status(403).send("Invalid access");
  }
});