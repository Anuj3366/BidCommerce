const CustomerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  address: String,
  cart:Object,
  orders:Object,
  wishlist:Object,
});
const Customer = mongoose.model('Customer', CustomerSchema);


