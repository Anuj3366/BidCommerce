const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const User = require('../Schemas/Users/user.js');

const secret = 'secrettohide';

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const founded = await User.findOne({ email: email, password: password });
  const userType = founded?.userType;
  if (founded) {
    const token = jwt.sign({ email: email, password: password, user: userType }, secret);
    res.json({ message: 'login successfully', token: `${token}` });
  }
  else {
    res.status(401).send("Invalid Credentials");
  }
});

router.post('/signup', async (req, res) => {
  const { name, email, password, address } = req.body;
  User.create({ name: name, email: email, password: password, address: address, userType: "user" ,wantTo:"user"}).then(user => {
    console.log(user, "User Created");
    const token = jwt.sign({ email: email, password: password }, secret);
    res.json({ message: 'Creation successfully', token: `${token}` });
  })
    .catch(err => {
      console.log(err);
      res.status(500).send("Error");
    });
});

// console.log("login.js");

module.exports = router;