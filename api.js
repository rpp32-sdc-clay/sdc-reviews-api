const express = require('express');
const app = express()
const port = 3000

app.get('/reviews', (req, res) => {
})


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})