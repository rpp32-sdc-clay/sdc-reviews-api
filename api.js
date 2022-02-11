const express = require('express');
const app = express()
const port = 3000


//get all reviews
app.get('/reviews', (req, res) => {

})

//get meta review info for individual products
app.get('/reviews/meta/:product_id', (req, res) => {

})

//post new review
app.post('/reviews', (req, res) => {

})

//mark review as helpful
app.put('/reviews/:review_id/helpful', (req, res) => {

})

//mark review as reported
app.put('/reviews/:review_id/report', (req, res) => {

})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})