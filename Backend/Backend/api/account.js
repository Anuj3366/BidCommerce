const express = require('express');
const router = express.Router();
const Product = require('../Schemas/Product.js');
const User = require('../Schemas/Users/customers.js');
const Seller = require('../Schemas/Users/seller.js');
const Worker = require('../Schemas/Users/worker.js');
const authorization = require('./authorization.js');

router.get('/checkuserType', authorization, async (req, res) => {
  const { email, password } = req.user;
  const founded = await User.findOne({ email: email, password: password });
  if (founded) {
    if (founded.userType === "seller") {
      const seller = await Seller.findOne({ email: email, password: password });
      if (seller && seller.verified) {
        res.json("seller");
      }
      else {
        res.json("notverified");
      }
    }
    else if (founded.userType === "worker") {
      const worker = await Worker.findOne({ email: email, password: password });
      if (worker && worker.verified) {
        res.json("worker");
      }
      else {
        res.json("notverified");
      }
    }
    else {
      res.json(founded.userType);
    }
  }
  else {
    res.status(401).send("Invalid Credentials");
  }
});


router.get('/getModerator', authorization, async (req, res) => {
  const { email, password } = req.user;
  const founded = await User.findOne({ email: email, password: password });
  if (founded) {
    res.json(founded);
  }
  else {
    res.status(401).send("Invalid Access");
  }
});

router.post('/becomeSeller', authorization, async (req, res) => {
  const { email, password } = req.user;
  const founded = await User.findOne({ email: email, password: password });
  if (founded && founded.userType === "user") {
    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      return res.status(401).send("Seller Already Exist");
    }
    else {
      const seller = new Seller({ ...req.body, email, password, verified: false, totalSold: 0 });
      await seller.save();
      await User.findOneAndUpdate({ email: email, password: password }, { userType: 'notverified' });
      return res.json("Seller Created");
    }
  }
  else {
    return res.status(401).send("Invalid Access");
  }
});




router.post('/becomeWorker', authorization, async (req, res) => {
  const { email, password } = req.user;
  const founded = await User.findOne({ email: email, password: password });
  if (founded && founded.userType === "user") {
    const existingWorker = await Worker.findOne({ email: email });
    if (existingWorker) {
      return res.status(401).send("Worker Already Exist");
    }
    else {
      const worker = new Worker({ email: email, password: password, adhaar: req.body.adhaar, verified: false });
      await worker.save();
      await User.findOneAndUpdate({ email: email, password: password }, { userType: 'notverified' });
      return res.json("Worker Created");
    }
  }
  else {
    return res.status(401).send("Invalid Access");
  }
});



router.post('/uploadProduct', authorization, async (req, res) => {
  const { email, password } = req.user;
  const seller = await Seller.findOne({ email: email, password: password });
  if (!seller || !seller.verified) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  else {
    const product = new Product({ ...req.body, sellerMail: email });
    await product.save();
    await Seller.updateOne({ email: email, password: password }, { $push: { productId: product._id } });
    res.json({ message: 'Product uploaded' });
  }
});


router.put('/product/:id/quantity', authorization, async (req, res) => {
  const { email, password } = req.user;
  const seller = await Seller.findOne({ email: email, password: password });
  if (!seller || !seller.verified) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  else {
    const { id } = req.params;
    const { increaseBy } = req.body;
    try {
      await Product.updateOne({ _id: id }, { $inc: { quantity: increaseBy } });
      res.status(200).json({ message: 'Product quantity updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error updating product quantity' });
    }
  }
});

router.get('/seller/:email/products', async (req, res) => {
  const { email, password } = req.user;
  const seller = await Seller.findOne({ email: email, password: password });
  if (!seller || !seller.verified) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  else {
    try {
      const seller = await Seller.findOne({ email });
      const products = await Product.find({ _id: { $in: seller.productId } });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching seller products' });
    }
  }
});

router.put('/user/:id/promote', authorization, async (req, res) => {
  const { email, password } = req.user;
  const admin = await User.findOne({ email: email, password: password, userType: 'admin' });
  if (!admin) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  else {
    const { id } = req.params;
    try {
      await User.findByIdAndUpdate(id, { userType: 'moderator' });
      res.status(200).json({ message: 'User promoted to moderator' });
    } catch (error) {
      res.status(500).json({ error: 'Error promoting user' });
    }
  }
});
router.put('/seller/:email/verify', authorization, async (req, res) => {
  const { email, password } = req.user;
  const moderator = await User.findOne({ email: email, password: password, userType: 'moderator' });
  if (!moderator) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  else {
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
});

router.put('/worker/:email/verify', authorization, async (req, res) => {
  const { email, password } = req.user;
  const moderator = await User.findOne({ email: email, password: password, userType: 'moderator' });
  if (!moderator) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  else {
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
});

router.get('/admin/users', authorization, async (req, res) => {
  const { email, password } = req.user;
  const admin = await User.findOne({ email: email, password: password, userType: 'admin' });
  if (!admin) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  else {
    try {
      const users = await User.find({ userType: 'user' });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching users' });
    }
  }
}
);

router.get('/getseller', authorization, async (req, res) => {
  const { email, password } = req.user;
  const moderator = await User.findOne({ email: email, password: password, userType: 'moderator' });
  if (!moderator) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  else {
    try {
      const wantToseller = await Seller.find({ verified: false });
      res.status(200).json(wantToseller);
    }
    catch (error) {
      res.status(500).json({ error: 'Error fetching users' });
    }
  }
});
router.get('/getworker', authorization, async (req, res) => {
  const { email, password } = req.user;
  const moderator = await User.findOne({ email: email, password: password, userType: 'moderator' });
  if (!moderator) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  else {
    try {
      const wantTowork = await Worker.find({ verified: false });
      res.status(200).json(wantTowork);
    }
    catch (error) {
      res.status(500).json({ error: 'Error fetching users' });
    }
  }
});


module.exports = router;
