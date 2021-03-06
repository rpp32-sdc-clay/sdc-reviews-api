require('dotenv').config();
const mongoose = require('mongoose');
const _ = require('underscore');

mongoose.connect(`mongodb+srv://doadmin:${process.env.DB_PW}@sdc-reviews-db-4aec7897.mongo.ondigitalocean.com/sdc?authSource=admin&replicaSet=sdc-reviews-db&tls=true&tlsCAFile=ca-certificate.crt`, {useUnifiedTopology: true, useNewUrlParser: true})
const db = mongoose.connection;

db.on('open', () => {
  console.log('Connected!')
})

db.on('error', () => {
  console.log('Error!')
})

const reviewSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  product_id: {
    type: Number,
  },
  reviewer_name: String,
  date: {
    type: Date,
    default: Date.now
  },
  rating: {
    type: Number,
  },
  summary: {
    type: String,
  },
  body: String,
  response: String,
  helpfulness: {
    type: Number,
    default: 0
  },
  photos: [
    {
      photo_id: {
        type: Number
      },
      url: {
        type: String
      }
    }
  ],
  characteristics: [
    {
      characteristic_name: String,
      characteristic_id: Number,
      characteristic_value: Number
    }
  ],
  reported: Boolean
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
  }],
})

const Reviews = mongoose.model('Reviews', reviewSchema);

Reviews.getReviews = (id) => {
  return Reviews.find({product_id: id}, (err, docs) => {
    if (err) {
      throw err;
    }
  }).clone()
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
        meta.ratings[doc.rating]++;
      //otherwise set the rating to 1
      } else {
        if (doc.rating) {
          meta.ratings[doc.rating] = 1;
        }
      }
      //add to number of whether the review is recommended or not
      if (doc.recommend) {
        meta.recommended[doc.recommend]++;
      }
      //combine the characteristics into a single characteristics object and add values to an array
      doc.characteristics.forEach(char => {
        if (meta.characteristics[char.name]) {
          meta.characteristics[char.name].value.push(char.value)
        } else {
          if (char.name) {
            meta.characteristics[char.name] = {
              id: char.characteristic_id,
              value: [char.value]
            }
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
    return meta;
  })
}

Reviews.markHelpful = (reviewId) => {
  //not updating in DB
    Reviews.findOneAndUpdate({id: reviewId}, {$inc: {helpfulness: 1}}, (err, doc) => {
      if (err) {
        reject(err);
      } else {
        return doc;
      }
    })
}


Reviews.markReported = (reviewId) => {
  //not updating in DB
    Reviews.findOneAndUpdate({id: reviewId}, {reported: 'true'}, (err, doc) => {
      if (err) {
        reject(err);
      } else {
        return doc;
      }
    })
}

Reviews.submitReview = async (reviewObj) => {
  var id = await Reviews.estimatedDocumentCount({}) + 1;
  reviewObj.id = id;
  Reviews.create(reviewObj, (err) => {
    if (err) {
      throw err;
    } else {
      console.log('Success!')
    }
  })
}

  module.exports = { db, Reviews }
// module.exports ={ db: db, Reviews: mongoose.models.Reviews || reviewSchema,
//   Characteristics: mongoose.models.Characteristics || characteristicsSchema,
//   CharacteristicReviews: mongoose.models.Characteristic_Reviews, Photos }
