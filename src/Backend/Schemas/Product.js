const mongoose = require('mongoose');
const { model, Schema, models } = mongoose;

const ProductSchema = new Schema({
  name: {type:String, required:true},
  id: {type: String, required: true},
  description: String,
  price: {type: Number, required: true},
  images: [{type:String}],
  category: {type:mongoose.Types.ObjectId, ref:'Category'},
  quantity: {type: Number, required: true},
  rating: Number,
  reviews: Object,
  bid: {type:Boolean, required:true},
  bidPrice: {type:Number, required:function() { return this.bid; }},
  bidEnd: {type:Date, required:function() { return this.bid; }}, 
});

const Product = models.Product || model('Product', ProductSchema);

module.exports = Product;
