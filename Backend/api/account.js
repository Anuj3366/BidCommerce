const express = require('express');
const router = express.Router();
const Product = require('../Schemas/Product.js');
const User = require('../Schemas/Users/customers.js');
const Seller = require('../Schemas/Users/seller.js');
const Worker = require('../Schemas/Users/worker.js');
const authorization = require('./authorization.js');
const bcrypt = require('bcrypt');

router.get('/checkuserType', authorization, async (req, res) => {
  const founded = req.user;
  const { password, ...user } = founded;

  if (founded.userType === "seller") {
    const seller = await Seller.findOne({ email: founded.email });
    if (seller && seller.verified && bcrypt.compareSync(seller.password, founded.password)) {
      res.json(user);
    }
    else {
      user.userType = "notverified";
      res.json(user);
    }
  }
  else if (founded.userType === "worker") {
    const worker = await Worker.findOne({ email: founded.email });
    if (worker && worker.verified && bcrypt.compareSync(worker.password, founded.password)) {
      res.json(user);
    }
    else {
      user.userType = "notverified";
      res.json(user);
    }
  }
  else {
    res.json(user);
  }
});


router.post('/becomeSeller', authorization, async (req, res) => {
  const founded = req.user;
  if (founded && founded.userType === "user") {
    const existingSeller = await Seller.findOne({ email: founded.email });
    if (existingSeller) {
      return res.status(401).send("Seller Already Exist");
    }
    else {
      const seller = new Seller({ ...req.body, email: founded.email, password: founded.password, verified: false, totalSold: 0 });
      await seller.save();
      await User.findOneAndUpdate({ email: founded.email }, { userType: 'notverified' });
      return res.json("Seller Created");
    }
  }
  else {
    return res.status(401).send("Invalid Access");
  }
});

router.post('/becomeWorker', authorization, async (req, res) => {
  const founded = req.user;
  if (founded && founded.userType === "user") {
    const existingWorker = await Worker.findOne({ email: founded.email });
    if (existingWorker) {
      return res.status(401).send("Worker Already Exist");
    }
    else {
      const worker = new Worker({ email: founded.email, password: founded.password, adhaar: req.body.adhaar, verified: false });
      await worker.save();
      await User.findOneAndUpdate({ email: founded.email }, { userType: 'notverified' });
      return res.json("Worker Created");
    }
  }
  else {
    return res.status(401).send("Invalid Access");
  }
});



router.post('/uploadProduct', authorization, async (req, res) => {
  const { email, password } = req.user;
  const seller = await Seller.findOne({ email: email });
  if (seller && seller.verified) {
    const product = new Product({ ...req.body, sellerMail: email });
    await product.save();
    await Seller.updateOne({ email: email }, { $push: { productId: product._id } });
    res.json({ message: 'Product uploaded' });
  }
  else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
});


router.put('/product/:id/quantity', authorization, async (req, res) => {
  const { email, password } = req.user;
  const seller = await Seller.findOne({ email: email });
  if (seller && seller.verified) {
    const { id } = req.params;
    const { increaseBy } = req.body;
    try {
      await Product.updateOne({ _id: id }, { $inc: { quantity: increaseBy } });
      res.status(200).json({ message: 'Product quantity updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error updating product quantity' });
    }
  }
  else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
});

router.get('/seller/products', authorization, async (req, res) => {
  const { email, password } = req.user;
  const seller = await Seller.findOne({ email: email });
  if (seller && seller.verified) {
    try {
      const seller = await Seller.findOne({ email });
      const products = await Product.find({ _id: { $in: seller.productId } });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching seller products' });
    }
  }
  else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
});

router.put('/user/:id/promote', authorization, async (req, res) => {
  const admin = req.user;
  if (admin.userType === "admin") {
    const { id } = req.params;
    try {
      await User.findByIdAndUpdate(id, { userType: 'moderator' });
      res.status(200).json({ message: 'User promoted to moderator' });
    } catch (error) {
      res.status(500).json({ error: 'Error promoting user' });
    }
  }
  else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
});

router.put('/seller/:email/verify', authorization, async (req, res) => {
  const moderator = req.user;
  if (moderator.userType === "moderator") {
    const { email } = req.params;
    try {
      const user = await User.findOne({ email: email });
      user.userType = "seller";
      await user.save();
      const seller = await Seller.findOne({ email: email });
      seller.verified = true;
      await seller.save();
      res.status(200).json({ message: 'User promoted to Seller' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error promoting user' });
    }
  }
  else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
});

router.put('/worker/:email/verify', authorization, async (req, res) => {
  const moderator = req.user;
  if (moderator.userType === "moderator") {
    const { email } = req.params;
    try {
      const user = await User.findOne({ email: email });
      user.userType = "worker";
      await user.save();
      const worker = await Worker.findOne({ email: email });
      worker.verified = true;
      await worker.save();
      res.status(200).json({ message: 'User promoted to worker' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error promoting user' });
    }
  }
  else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
});

router.get('/admin/users', authorization, async (req, res) => {
  const admin = req.user;
  if (admin.userType === "admin") {
    try {
      const users = await User.find({ userType: 'user' });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching users' });
    }
  }
  else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}
);

router.get('/getseller', authorization, async (req, res) => {
  const moderator = req.user;
  if (moderator.userType === "moderator") {
    try {
      const wantToseller = await Seller.find({ verified: false });
      res.status(200).json(wantToseller);
    }
    catch (error) {
      res.status(500).json({ error: 'Error fetching users' });
    }
  }
  else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
});

router.get('/getworker', authorization, async (req, res) => {
  const moderator = req.user;
  if (moderator.userType === "moderator") {
    try {
      const wantTowork = await Worker.find({ verified: false });
      res.status(200).json(wantTowork);
    }
    catch (error) {
      res.status(500).json({ error: 'Error fetching users' });
    }
  }
  else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
});


module.exports = router;
