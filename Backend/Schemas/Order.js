const mongoose = require('mongoose');
const { model, models, Schema } = mongoose;

const OrderSchema = new Schema({
  line_items:{type:Object,required:true},
  name:{type:String,required:true},
  email:{type:String,required:true},
  address:{type:String,required:true},
  paid:{type:Boolean,required:true},
  orderId: {type: mongoose.Schema.Types.ObjectId, ref:'Order'},
});

const Order = models.Order || model('Order', OrderSchema);

module.exports = Order;
