import jwt from 'jsonwebtoken';
import express from 'express';
import connectDB from '../mongoose.js';
import autorization from './autorization.js';
import { User } from '../Schemas/Users/user.js';

const app = express();
app.use(express.json());
connectDB();

const secret = 'secrettohide';


app.get('/login', async (req, res) => {
  const { email, password } = req.body;
  const founded = await User.findOne({ email: email, password: password });
  const userType = founded.userType;
  if (founded) {
    const token = jwt.sign({ email: email, password: password, user: userType }, secret);
    res.json({ message: 'login successfully', token: `Bearer ${token}` });
  }
  else {
    res.status(401).send("Invalid Credentials");
  }
});

app.post('/signup', async (req, res) => {
  const { name, email, password, address } = req.body;
  User.create({ name: name, email: email, password: password, address: address, userType: "user" }).then(user => {
    console.log(user, "User Created");
    const token = jwt.sign({ email: email, password: password }, secret);
    res.json({ message: 'Creation successfully', token: `Bearer ${token}` });
  })
    .catch(err => {
      console.log(err);
      res.status(500).send("Error");
    });
});