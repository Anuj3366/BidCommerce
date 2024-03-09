const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Schemas/Users/customers.js');
const authorization = require('./authorization.js');

const secret = 'secrettohide';

router.post('/login', authorization, async (req, res) => {
  return res.json({ message: 'login successfully', user: req.user });
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
      const token = jwt.sign({ email: email, user: user.userType }, secret, { expiresIn: '10d' });
      res.cookie('jwt',`Bearer ${token}`, { httpOnly: true, maxAge: 10 * 24 * 60 * 60 * 1000 });
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

module.exports = router;