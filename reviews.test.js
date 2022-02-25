/*
 * @jest-environment jsdom
 */
import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react';
import axios from 'axios';

var local = 'http://localhost:3000'
var productId = 12;
var reviewId = 15;
test('sends GET request for reviews for a specific product ID', (done) => {
  axios.get(`${local}/reviews/${productId}`)
  .then((result) => {
    expect(JSON.stringify(result.data)).toContain('Fugit voluptas aut accusamus iure maiores.');
    done();
  })
})

test('sends GET request for review meta for a specific product ID', (done) => {
  axios.get(`${local}/reviews/${productId}`)
  .then((result) => {
    expect(JSON.stringify(result.data)).toContain('characteristics');
    done();
  })
})