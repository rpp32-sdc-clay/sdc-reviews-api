const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sdc', { useUnifiedTopology: true })
const db = mongoose.connection;

db.on('open', () => {
  console.log('Connected!')
})

db.on('error', () => {
  console.log('Error!')
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

const CharactersticsCombinedSchema = new mongoose.Schema({
  photo_id: {
    type: Number,
    required: true
  },
  url: {
    type: String,
    required: true
  }
})

// const characteristicsSchema = new mongoose.Schema({
//   characteristic_id: {
//     type: Number,
//     required: true
//   },
//   product_id: {
//     type: Number,
//     required: true
//   },
//   name: {
//     type: String,
//     required: true
//   }
// })

// const characteristicReviewsSchema = new mongoose.Schema({
//   id: {
//     type: Number,
//     required: true
//   },
//   characteristic_id: {
//     type: Number,
//     required: true
//   },
//   review_id: {
//     type: Number,
//     required: true
//   },
//   value: {
//     type: Number,
//     required: true
//   }
// })

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
const Photos = mongoose.model('Photos', photoSchema);
const CharacteristicsCombined = mongoose.model('characteristics_combined', CharactersticsCombinedSchema);

Reviews.getReviews = (err, id) => {
  if (err) {
    reject(err)
  } else {
    if (id) {
      return Reviews.find({product_id: id})
    } else {
      return Reviews.find({}).limit(20)
    }
  }
}

  module.exports = { db, Reviews }
// module.exports ={ db: db, Reviews: mongoose.models.Reviews || reviewSchema,
//   Characteristics: mongoose.models.Characteristics || characteristicsSchema,
//   CharacteristicReviews: mongoose.models.Characteristic_Reviews, Photos }