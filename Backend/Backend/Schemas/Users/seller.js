const mongoose = require('mongoose');

const SellerSchema = new mongoose.Schema({
  email: {type:String, required:true},
  password: {type:String, required:true},
  shopname: {type:String, required:true},
  shopemail: {type:String, required:true},
  verified: {type:Boolean, required:true},
  GSTINnumber: {type:String, required:true},
  PANnumber: {type:String, required:true},
  productId: {type: [Object]},
  address: {type:String, required:true},
  totalSold: {type:Number, required:true},
});

const Seller = mongoose.model('Seller', SellerSchema);

module.exports = Seller;
