import { check } from 'k6';
import http from 'k6/http';

let someTicker = () => {
  let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let alpha = alphabet.split('');
  let fullTicker = [];

  for (let i = 0; i < 4; i++) {
    if (fullTicker.length === 0) {
      fullTicker.push(alpha[Math.floor(Math.random() * 9)]);
    } 
    fullTicker.push(alpha[Math.floor(Math.random() * 26)]);
  }
  return fullTicker.join('');
}

let ticker = someTicker();

export default function() {
  let res = http.get(`http://localhost:8080/api/earnings/${ticker}`)
  check(res, {
    "status was 200": (r) => r.status == 200,
    "transaction time OK": (r) => r.timings.duration < 2000
  });
};