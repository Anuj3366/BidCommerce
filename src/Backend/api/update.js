const express = require('express');
const router = express.Router();
const connectDB = require('../mongoDB.js');
const authorization = require('./authorization.js');
const User = require('../Schemas/Users/user.js');

connectDB();

router.put('/changePassword', authorization, async (req, res) => {
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
console.log("update.js");

module.exports = router;
