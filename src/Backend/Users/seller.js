const SellerSchema = new mongoose.Schema({
  email: String,
  shopname: String,
  shopemail: String,
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
