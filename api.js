const express = require('express');
const path = require('path');
const app = express()
const port = 3000
const database = require('./db.js')

app.use("/", express.static(path.join(__dirname, 'client', 'dist')));
app.get('/', (req, res) => {
  res.end()
})

//get all reviews
app.get('/reviews/:product_id', (req, res) => {
  return new Promise((resolve, reject) => {
    resolve(database.Reviews.getReviews(null, req.query.product_id));
  })
  .catch((err) => {
    console.log('Error!', err)
    res.sendStatus(500)
  })
  .then((data) => {
    res.send(data);
  })
})

//get meta review info for individual products
app.get('/reviews/meta/:product_id', (req, res) => {
//to do later
})

//post new review
app.post('/reviews', (req, res) => {
//to do later
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
//to do later
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})