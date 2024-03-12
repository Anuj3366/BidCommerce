const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const authorization = require('./authorization.js');
const User = require('../Schemas/Users/customers.js');
const Product = require('../Schemas/Product.js');

router.put('/changePassword', authorization, async (req, res) => {
  const { email, newPassword } = req.body;
  const founded = await User.findOne({ email: email });
  if (founded) {
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    const updated = await User.updateOne({ email: email }, { password: hashedPassword });
    res.json(updated);
  }
  else {
    res.status(401).send("Invalid Credentials");
  }
});

router.put('/bid/:id', authorization, async (req, res) => {
  const { email } = req.body;
  const founded = await User.findOne({ email: email });
  if (founded) {
    const { bidPrice } = req.body;
    Product.findById(req.params.id)
      .then(product => {
        if (new Date() > product.bidEnd) {
          return res.status(400).json({ error: 'The bidding period has ended.' });
        }
        if (bidPrice <= product.bidPrice) {
          return res.status(400).json({ error: 'Your bid must be higher than the current bid.' });
        }
        product.bidPrice = bidPrice;
        return product.save();
      })
      .then(() => res.json({ message: 'Bid updated successfully.' }))
      .catch(err => res.status(500).json({ error: err.message }));
  }
  else {
    res.status(401).send(({ error: 'Authorization failed', redirectToLogin: true }));
  }
});

module.exports = router;
