
/*
 * @jest-environment jsdom
 */
import React from 'react'
import {render, fireEvent, screen} from '@testing-library/react';
import axios from 'axios';

test('sends GET request for reviews for a specific product ID', () => {
  return new Promise ((resolve, reject) => {
    var current = 12
    // axios.defaults.headers.common['Authorization'] = this.props.token;
    resolve(axios.get(`/reviews/:product_id`, {
      params: {
        product_id: current
      }
    }))
  })
  .then((data) => {
    expect(data).toContain('Fugit voluptas aut accusamus iure maiores.')
  })
})

test('sends PUT request to API to mark a review as helpful', () => {
  var testId = 15;
  var result;
  return new Promise ((resolve, reject) => {
    // axios.defaults.headers.common['Authorization'] = this.props.token;
    resolve(axios.get(`reviews/${testId}/helpful`))
  })
  .then((data) => {
    result = data;
  })
  .then(() => {
    resolve(axios.put(`reviews/${testId}/helpful`))
  })
  .then((data) => {
    expect(data).toBe(result + 1)
  })
})