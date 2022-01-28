const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sdc')
var db = mongoose.connection;

const schema = new mongoose.Schema({
  review_id: {
    type: Number,
    required: true
  },
  product_id: {
    type: Number,
    required: true
  },
  reviewer_name: String,
  date: {
    type: Date,
    default: Date.now
  },
  rating: {
    type: Number,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  body: String,
  response: String,
  helpfulness: Number,
  photos: [
    {
      photo_id: {
        type: Number,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    }
  ]
})