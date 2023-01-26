let mongoose = require('mongoose');

let orderSchema = mongoose.Schema({
  itemId: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  shipping: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  pid: {
    type: String,
    required: true
  }
});

exports.Order =  mongoose.model('Order', orderSchema);
