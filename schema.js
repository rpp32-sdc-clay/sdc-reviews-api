const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sdc')
var db = mongoose.connection;

db.on('connection', () => {
  console.log('Connected!')
})

//ideal schema

// const idealSchema = new mongoose.Schema({
//   review_id: {
//     type: Number,
//     required: true
//   },
//   product_id: {
//     type: Number,
//     required: true
//   },
//   reviewer_name: String,
//   date: {
//     type: Date,
//     default: Date.now
//   },
//   rating: {
//     type: Number,
//     required: true
//   },
//   summary: {
//     type: String,
//     required: true
//   },
//   body: String,
//   response: String,
//   helpfulness: Number,
//   photos: [
//     {
//       photo_id: {
//         type: Number,
//         required: true
//       },
//       url: {
//         type: String,
//         required: true
//       }
//     }
//   ],
//   characteristics: [
//     {
//       characteristic_name: String,
//       characteristic_id: Number,
//       characteristic_value: Number
//     }
//   ]
// })

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
  helpfulness: Number
})

const photoSchema = new mongoose.Schema({
  photo_id: {
    type: Number,
    required: true
  },
  url: {
    type: String,
    required: true
  }
})

const characteristicsSchema = new mongoose.Schema({
  characteristic_id: {
    type: Number,
    required: true
  },
  product_id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})

const characteristicReviewsSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  characteristic_id: {
    type: Number,
    required: true
  },
  review_id: {
    type: Number,
    required: true
  },
  value: {
    type: Number,
    required: true
  }
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

const Reviews = mongoose.model('Reviews', reviewSchema);
const Characteristics = mongoose.model('Characteristic Reviews', characteristicsSchema);
const CharacteristicReviews = mongoose.model('Characteristic Reviews', characteristicReviewsSchema);
const Photos = mongoose.model('Photos', photoSchema);

export default {Reviews, Characteristics, CharacteristicReviews, Photos}