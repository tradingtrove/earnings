const faker = require('faker');



const companyData = [];
const tickers = {};
const allQuarters = ['Q4 2017', 'Q1 2018', 'Q2 2018', 'Q3 2018', 'Q4 2018', 'Q1 2019', 'Q2 2019'];
allEarnings = [];

let createTicker = () => {
  let ticker = '';
  let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  for (let i = 0; i < 5; i++) {
    ticker += alphabet[Math.floor(Math.random() * 26)]
  }
  if (tickers[ticker]) {
    createTicker();
  } else {
    tickers[ticker] = ticker;
  }
  return ticker;
}

console.time();
for (let i = 0; i < 100000; i++) {
  companyData.push({
    id: i.toString(),
    ticker: createTicker(),
    company: faker.company.companyName(),
  });
}
console.timeEnd();

console.time();
for (const company of companyData) {
  let actualEarning = Math.random() * 7;
  let estimatedEarning;
  let quarterNumber = 0;
  for (const quarter of allQuarters) {
    let range = Math.floor(Math.random() * 100);
    range *= Math.floor(Math.random() * 2) === 1 ? 0.45 : -0.40;
    actualEarning *= (1 + range / 100);
    actualEarning = actualEarning.toFixed(2);

    let estimateRange = Math.floor(Math.random() * 100);
    estimateRange *= Math.floor(Math.random() * 2) === 1 ? 0.10 : -0.10;
    estimatedEarning = actualEarning * (1 + estimateRange / 100);
    estimatedEarning = estimatedEarning.toFixed(2);

    allEarnings.push({
      id: company.id,
      ticker: company.ticker,
      company: company.company,
      quarter,
      quarterNumber,
      actualEarning: Number(actualEarning),
      estimatedEarning: Number(estimatedEarning),
    });
    quarterNumber += 1;
  }
}
console.timeEnd()

console.log(allEarnings);