let mongoose = require('mongoose');

let itemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  imgUrl: {
    type: String,
    required: true
  },
});

exports.Item =  mongoose.model('Item', itemSchema);
