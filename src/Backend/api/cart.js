const { connectDB } = require('../mongoDB.js');
const { Product } = require('../Schemas/Product.js');


console.log("cart.js");
module.exports = async function handle(req, res) {
  await connectDB();
  const ids = req.body.ids;
  res.json(await Product.find({_id: ids}));
}
