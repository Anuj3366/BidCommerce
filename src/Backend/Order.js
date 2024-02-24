const mongoose = require('mongoose');
const { model, models, Schema } = mongoose;

const OrderSchema = new Schema({
  line_items:Object,
  name:String,
  email:String,
  city:String,
  postalCode:String,
  streetAddress:String,
  country:String,
  paid:Boolean,
});

const Order = models.Order || model('Order', OrderSchema);

module.exports = Order;
