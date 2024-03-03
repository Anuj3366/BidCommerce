const express = require('express');
const router = express.Router();
const authorization = require('./authorization.js');
const User = require('../Schemas/Users/customers.js');


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


router.put('/upgradeToSeller', authorization, async (req, res) => {
  const { email, password } = req.body;
  const founded = await User.findOne({ email: email, password: password });
  if(founded && founded.userType != 'user' && founded.userType != 'worker'){
    const {userEmail, userPassword} = req.body;
    const userfounded = await User.findOne({ email: userEmail, password: userPassword });
    if(userfounded.userType == 'user' && userfounded.userType == 'worker'){
      const updated = await User.update;
      User.updateOne({ email: email, password: password }, { userType: 'seller' });
      res.json(updated);
    }
    else{
      res.status(401).send("Invalid User");
    }
  }
  else{
    res.status(401).send("Invalid Credentials");
  }
});

router.put('/upgradeToModerator', authorization, async (req, res) => {
  const { email, password } = req.body;
  const founded = await User.findOne({ email: email, password: password });
  if(founded && founded.userType != 'user' && founded.userType != 'worker'){
    const {userEmail, userPassword} = req.body;
    const userfounded = await User.findOne({ email: userEmail, password: userPassword });
    if(userfounded.userType == 'user' && userfounded.userType == 'worker'){
      const updated = await User.update;
      User.updateOne({ email: email, password: password }, { userType: 'moderator' });
      res.json(updated);
    }
    else{
      res.status(401).send("Invalid User");
    }
  }
  else{
    res.status(401).send("Invalid Credentials");
  }
});


module.exports = router;