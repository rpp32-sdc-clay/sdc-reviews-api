const mongoose = require('mongoose');
const _ = require('underscore');

mongoose.connect('mongodb://localhost:27017/sdc', { useUnifiedTopology: true })
const db = mongoose.connection;
mongoose.set('useFindAndModify', false);

db.on('open', () => {
  console.log('Connected!')
})

db.on('error', () => {
  console.log('Error!')
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

const Reviews = mongoose.model('Reviews', reviewSchema);

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


Reviews.getReviewMeta = (productId) => {
  //create meta object
  var meta = {
    product_id: productId,
    ratings: {},
    recommended: {
      true: 0,
      false: 0,
    },
    characteristics: {}
  };
  //aggregate reviews and only project rating, whether it's recommended, and characteristics
  var reviews = Reviews.aggregate([{$match: {'product_id': productId}},{$project: {rating: 1, recommend: 1, "characteristics.name": 1, "characteristics.characteristic_id": 1, "characteristics.value": 1}}], (err, docs) => {
    if (err) {
      console.log(err)
      throw err;
    }
  })
  return new Promise((resolve, reject) => {
    resolve(reviews)
  })
  .then((docs)=> {
    //for each document
    docs.forEach((doc) => {
      //if the meta object has the rating, increase it
      if (meta.ratings[doc.rating]) {
        meta.ratings[doc.rating]++
      //otherwise set the rating to 1
      } else {
        meta.ratings[doc.rating] = 1
      }
      //add to number of whether the review is recommended or not
      meta.recommended[doc.recommend]++
      //combine the characteristics into a single characteristics object and add values to an array
      doc.characteristics.forEach(char => {
        if(meta.characteristics[char.name]) {
          meta.characteristics[char.name].value.push(char.value)
        } else {
          meta.characteristics[char.name] = {
            id: char.characteristic_id,
            value: [char.value]
          }
        }
      })
    })
  })
  .then(() => {
    //average and round the characteristics values
    for (var key in meta.characteristics) {
      meta.characteristics[key].value = Math.round(meta.characteristics[key].value.reduce((acc, add) => acc + add)/meta.characteristics[key].value.length * 1000)/1000
    }
    return meta
  })
}

Reviews.markHelpful = (productId) => {
  //not updating in DB
    return Reviews.updateOne({id: productId}, {$inc: {helpfulness: 1}}, (err, doc) => {
      if (err) {
        reject(err);
      } else {
        return doc;
      }
    })
}


  module.exports = { db, Reviews }
// module.exports ={ db: db, Reviews: mongoose.models.Reviews || reviewSchema,
//   Characteristics: mongoose.models.Characteristics || characteristicsSchema,
//   CharacteristicReviews: mongoose.models.Characteristic_Reviews, Photos }