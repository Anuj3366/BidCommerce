const mongoose = require('mongoose');
const { model, Schema, models } = mongoose;

const ProductSchema = new Schema({
  title: {type:String, required:true},
  description: {type:String, required:true},
  price: {type: Number, required: true},
  images: [{type:[String], required:true}],
  category: {
    type: String,
    enum: [
      'Electronics', 'Clothes', 'Furniture', 'Books', 'Home Appliances',
      'Sports', 'Toys', 'Beauty & Health', 'Automotive', 'Garden',
      'Music', 'Movies & TV Shows', 'Video Games', 'Computers', 'Office Supplies',
      'Pet Supplies', 'Baby', 'Grocery', 'Tools & Home Improvement', 'Arts & Crafts'
    ],
    required: true
  },
  sellerMail: {type:String, required:true},
  quantity: {type: Number, required: true},
  comment: {type:[String], required:true},
  buyed : {type:Number, required:true},
  reviews: {type:Number, required:true},
  bid: {type:Boolean, required:true},
  bidPrice: {type:Number, required:function() { return this.bid; }},
  bidEnd: {type:Date, required:function() { return this.bid; }}, 
});

const Product = models.Product || model('Product', ProductSchema);

module.exports = Product;
