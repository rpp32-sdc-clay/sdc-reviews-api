const Promise = require('bluebird');
const fs = require('fs')
const fastcsv = require('fast-csv')
const _ = require('underscore');
const express = require('express');
const app = express()
const port = 3000
const { MongoClient } = require('mongodb');

app.get('/', (req, res) => {
  var functions = {};

  var mapped = _.groupBy(data, 'product_id')
  return mapped

  // functions.readCharacteristics = (characteristics) => {
  //   const client = new MongoClient('mongodb://localhost/');
  //   return new Promise((resolve, reject) => {
  //     resolve(client.connect())
  //   })
  //     .then(() => {
  //       fastcsv.parseFile(characteristics, { headers: true })
  //         .on('error', error => console.log(error))
  //         .on('data', (row) => { characteristicsArr.push({ 'characteristic_id': row.id, 'characteristic_name': row.name }) })
  //         .on('end', () => {
  //           fs.writeFile('./characteristics.json', JSON.stringify(characteristicsArr), (err) => {
  //             if (err) {
  //               console.log(err)
  //             } else {
  //               console.log('Done!')
  //             }
  //           })
  //         })
  //     })
  // }


  // Promise.promisifyAll(functions)
  // return functions.readCharacteristics('./characteristics.csv')
})


// fastcsv.parseFile('./characteristic_reviews.csv', { headers: true })
//   .on('error', error => console.log(error))
//   .on('data', (row) => {
//     for (var key in characteristicsByProductId) {
//       for (var key of characteristicsByProductId[key]) {
//         if (key.id == row.characteristic_id) {
//           key.reviews.push({
//             review_id: row.review_id,
//             value: row.value
//           })
//         }
//       }
//     }
//   })
//   .on('end', () => {
//     })
//   })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})