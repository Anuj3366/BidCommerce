const CustomerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  address: String,
  cart:Object,
  orders:Object,
  wishlist:Object,
  userType:{ type: String, enum: ['user', 'seller', 'worker','moderator','admin'] },
});
const Customer = mongoose.model('Customer', CustomerSchema);


