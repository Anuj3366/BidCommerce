const mongoose = require('mongoose');
const { model, models, Schema } = mongoose;

const OrderSchema = new Schema({
  line_items:{type:Object,required:true},
  name:{type:String,required:true},
  email:{type:String,required:true},
  city:{type:String,required:true},
  Address:{type:String,required:true},
  paid:{type:Boolean,required:true},
});

const Order = models.Order || model('Order', OrderSchema);

module.exports = Order;
