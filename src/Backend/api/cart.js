const { connectDB } = require('@/Backend/mongoDB.js');
const { Product } = require('@/Backend/Schemas/Product');

module.exports = async function handle(req, res) {
  await connectDB();
  const ids = req.body.ids;
  res.json(await Product.find({_id: ids}));
}
