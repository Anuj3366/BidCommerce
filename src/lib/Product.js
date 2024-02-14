import mongoose, {model, Schema, models} from "mongoose";

const ProductSchema = new Schema({
}, {
  timestamps: true,
  name: {type:String, required:true},
  description: String,
  price: {type: Number, required: true},
  images: [{type:String}],
  category: {type:mongoose.Types.ObjectId, ref:'Category'},
  quantity: {type: Number, required: true},
  rating: Number,
  reviews: Object,
});

export const Product = models.Product || model('Product', ProductSchema);