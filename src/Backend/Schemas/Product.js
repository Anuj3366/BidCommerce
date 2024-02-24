import mongoose, {model, Schema, models} from "mongoose";

const ProductSchema = new Schema({
}, {
  name: {type:String, required:true},
  id: {type: Number, required: true},
  description: String,
  price: {type: Number, required: true},
  images: [{type:String}],
  category: {type:mongoose.Types.ObjectId, ref:'Category'},
  quantity: {type: Number, required: true},
  rating: Number,
  reviews: Object,
  bid: {type:Boolean, required:true},
  bidPrice: {type:Number, required:bid},
  bidEnd: {type:Date, required:bid}, 
});

export const Product = models.Product || model('Product', ProductSchema);