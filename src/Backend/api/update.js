import express from 'express';
import connectDB from '../mongoDB.js';
import {authorization} from './autorization.js';
import {User} from '../Schemas/Users/user.js';

const app = express();
app.use(express.json());
connectDB();

app.put('/changePassword', authorization, async (req, res) => {
  const { email, password } = req.body;
  const founded = await User.findOne({ email: email, password: password });
  if(founded){
    const updated = await User.update({ email: email, password: password }, { password: req.body.newPassword });
    res.json(updated);
  }
  else{
    res.status(401).send("Invalid Credentials");
  }
});