const faker = require('faker');
const fs = require('fs');

const file = fs.createWriteStream('./DataGen.csv');

const tickers = {};
let allEarnings = [];
const allQuarters = ['Q4 2017', 'Q1 2018', 'Q2 2018', 'Q3 2018', 'Q4 2018', 'Q1 2019', 'Q2 2019'];

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

let generation = () => {
  const company = {
    ticker: createTicker(),
    company: faker.company.companyName().replace(/[,]/, ''),
  }
  let companyEarnings = [];
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

    companyEarnings.push({
      ticker: company.ticker,
      company: company.company,
      quarter,
      quarterNumber,
      actualEarning: Number(actualEarning),
      estimatedEarning: Number(estimatedEarning),
    });
    quarterNumber += 1;
  }
  allEarnings.push(companyEarnings);
}

let convertToCsv = (array) => {
  let csvString = '';
  array.forEach( (company) => {
    for (let i = 0; i < company.length; i++) {
      csvString += Object.values(company[i]).join() + '\n';
    }
  });
  return csvString;
}

let writeOneMillionTimes = (writer, encoding, callback) => {
  let i = 2;
  write = () => {
    let ok = true;
    do {
      generation();
      let data = convertToCsv(allEarnings);
      i--;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
    
  }
  write();
}

writeOneMillionTimes(file);
 