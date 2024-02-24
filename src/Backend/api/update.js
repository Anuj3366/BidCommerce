const express = require('express');
const connectDB = require('../mongoDB.js');
const { authorization } = require('./autorization.js');
const { User } = require('../Schemas/Users/user.js');

const app = express();
app.use(express.json());
connectDB();

app.put('/changePassword', authorization, async (req, res) => {
  const { email, password } = req.body;
  const founded = await User.findOne({ email: email, password: password });
  if(founded){
    const updated = await User.updateOne({ email: email, password: password }, { password: req.body.newPassword });
    res.json(updated);
  }
  else{
    res.status(401).send("Invalid Credentials");
  }
});
