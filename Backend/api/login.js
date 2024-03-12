const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Schemas/Users/customers.js');
const authorization = require('./authorization.js');

const secret = 'secrettohide';

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email: email
  });
  if (!user) {
    console.log("User not found");
    return res.status(401).json({ error: 'Authorization failed' });
  }
  if (!bcrypt.compareSync(password, user.password)) {
    console.log("Password not matched");
    return res.status(401).json({ error: 'Authorization failed' });
  }
  const token = jwt.sign({ email: email,password:password}, secret, { expiresIn: '10d' });
  res.cookie('jwt',token, { httpOnly: true, maxAge: 10 * 24 * 60 * 60 * 1000 });
  const { password: pass, ...userWithoutPassword } = user.toObject();
  res.json({ message: 'Login successfully', token: `${token}`,userWithoutPassword });
});

router.post('/signup', async (req, res) => {
  const { name, email, password, address } = req.body;
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    res.status(409).send("User already exists");
  } else {
    const hashedPassword = bcrypt.hashSync(password, 10);
    User.create({ name: name, email: email, password: hashedPassword, address: address, userType: "user" }).then(user => {
      console.log(user, "User Created");
      const token = jwt.sign({ email: email,password:password}, secret, { expiresIn: '10d' });
      res.cookie('jwt',token, { httpOnly: true, maxAge: 10 * 24 * 60 * 60 * 1000 });
      res.json({ message: 'Creation successfully', token: `${token}` });
    })
      .catch(err => {
        console.log(err);
        res.status(500).send("Error");
      });
  }
});

router.get('/isLogin', authorization, (req, res) => {
  return res.json({ loggedIn: true, user: req.user });
});

router.get('/logout', (req, res) => {
  res.clearCookie('jwt');
  res.json({ message: 'Logout successful' });
});

module.exports = router;
