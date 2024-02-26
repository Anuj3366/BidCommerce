const { Product } = require('../Schemas/Product.js');
const { User } = require('../Schemas/Users/user.js');
const router = express.Router();
const authorization = require('./authorization.js');

router.post('/addToCart', authorization, async (req, res) => {
  const { email, password } = req.body;
  const founded = await User.findOne({ email: email, password: password });
  if (founded) {
    const { productID } = req.body;
    const product = await Product.findById(productID);
    const cart = founded.cart;
    cart.push(product);
    const updated = await User.updateOne({ email: email, password: password }, { cart: cart });
    res.json(updated);
  }
  else {
    res.status(401).send("Invalid Credentials");
  }
});
router.get('/getCart', authorization, async (req, res) => {
  const { email, password } = req.body;
  const founded = await User.findOne({ email: email, password: password });
  if (founded) {
    res.json(founded.cart);
  }
  else {
    res.status(401).send("Invalid Credentials");
  }
});

module.exports = router;