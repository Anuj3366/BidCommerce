const SellerSchema = new mongoose.Schema({
  shopname: String,
  shopemail: String,
  password: String,
  verified: Boolean,
  GSTINnumber: String,
  PANnumber: String,
  selling: Object,
  address: String,
  orders: Object,
  totalSold: Number,
  monthlySold: Number,
});
const Seller = mongoose.model('Seller', SellerSchema);
