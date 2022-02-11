const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sdc')
var db = mongoose.connection;

db.on('connection', () => {
  console.log('Connected!')
})

const reviewSchema = new mongoose.Schema({
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
  ],
  characteristics: [
    {
      characteristic_name: String,
      characteristic_id: Number,
      characteristic_value: Number
    }
  ]
})

const metaSchema = new mongoose.Schema({
  product_id: {
    type: Number,
    required: true
  },
  ratings: [{
    1: Number,
    2: Number,
    3: Number,
    4: Number,
    5: Number
  }],
  recommended: [{
    true: Number,
    false: Number
  }],
  characteristics: [{
    characteristic_name: String,
    characteristic_id: Number,
    characteristic_value: Number
  }]
})

const Review = mongoose.model('Reviews', reviewSchema);