import jwt from 'jsonwebtoken';
import express from 'express';
import connectDB from '../connectDB.js';

const app = express();
app.use(express.json());
connectDB();
const secret = 'secrettohide';

function authorization(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, secret);
    next(decoded);
  } catch (e) {
    res.status(401).send("Invalid Token");
  }
}

app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  User.create({ name: name, email: email, password: password }).then(user => {
    console.log("User Created");
    const token = jwt.sign({ email: email, password: password }, secret);
    res.json({ message: 'Creation successfully', token:  `Bearer ${token}` });
  })
  .catch(err => {
    console.log(err);
    res.status(500).send("Error");
  });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const founded = await User.findOne({ email: email, password: password });
  if (founded) {
    //creating JWT token
    const token = jwt.sign({ email: email, password: password }, secret);
    console.log("Login Successful");
    //sending token to frontend
    res.json({ message: 'login successfully', token:  `Bearer ${token}` });
  }
  else {
    req.status(401).send("Invalid Credentials");
  }
});

app.post('/signup',authorization, async (req, res) => {
  const { name, email, password } = req.body;
  User.create({ name: name, email: email, password: password }).then(user => {
    console.log("User Created");
    const token = jwt.sign({ email: email, password: password }, secret);
    res.json({ message: 'Creation successfully', token:  `Bearer ${token}` });
  })
  .catch(err => {
    console.log(err);
    res.status(500).send("Error");
  });
});
app.listen(3000, () => console.log('Server running on port 3000'));