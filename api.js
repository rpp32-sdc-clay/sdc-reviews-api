const express = require('express');
const _ = require('underscore');
const path = require('path');
const app = express()
const port = 3000
const cors = require('cors')
const database = require('./db.js')

app.use(cors())
app.use("/", express.static(path.join(__dirname, 'client', 'dist')));
app.get('/', (req, res) => {
  res.end()
})

//get all reviews
app.get('/reviews/:product_id', (req, res) => {
  return new Promise((resolve, reject) => {
    resolve(database.Reviews.getReviews(parseInt(req.params.product_id)))
  })
    .catch((err) => {
      console.log('Error!', err)
      res.sendStatus(500)
    })
    .then((data) => {
      console.log(data)
      res.send(data);
    })
})

//get meta review info for individual products
app.get('/reviews/meta/:product_id', (req, res) => {
  //Optimize later with aggregation
  var productId = parseInt(req.params.product_id)
  return new Promise((resolve, reject) => {
    resolve(database.Reviews.getReviewMeta(productId));
  })
    .catch((err) => {
      console.log('Error!', err)
      res.sendStatus(500)
    })
    .then((data) => {
      res.send(data);
    })
})

//post new review
app.post('/reviews', (req, res) => {
  console.log(req)
})

//mark review as helpful
app.put('/reviews/:review_id/helpful', (req, res) => {
  return new Promise((resolve, reject) => {
    resolve(database.Reviews.markHelpful(parseInt(req.params.review_id)))
  })
    .catch((err) => {
      console.log('Error!', err);
      res.sendStatus(500);
    })
    .then((data) => {
      res.send(data)
    })
})

//mark review as reported
app.put('/reviews/:review_id/report', (req, res) => {
  return new Promise((resolve, reject) => {
    resolve(database.Reviews.markReported(parseInt(req.params.review_id)))
  })
    .catch((err) => {
      console.log('Error!', err);
      res.sendStatus(500);
    })
    .then((data) => {
      res.send(data)
  })
})

app.listen(port, () => {
  console.log(`Listening at http://127.0.0.1:${port}`)
})
module.exports.app = app;