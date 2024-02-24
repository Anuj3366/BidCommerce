const CustomerSchema = new mongoose.Schema({
  name: {type:String, required:true},
  email: {type:String, required:true},
  password: {type:String, required:true},
  address: {type:String, required:true},
  cart:Object,
  orders:Object,
  wishlist:Object,
  userType:{ type: String, enum: ['user' , 'seller', 'worker','moderator','admin'] },
  wantTo:{ type: String, enum: ['seller', 'worker','moderator'] },
});
const Customer = mongoose.model('Customer', CustomerSchema);


