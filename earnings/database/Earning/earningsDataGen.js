const faker = require('faker');
const fs = require('fs');

const file = fs.createWriteStream('./DataGen.csv');
const csvFile = './DataGenCSV';

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
  const companyData = {
    ticker: createTicker(),
    company: faker.company.companyName(),
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
      ticker: companyData.ticker,
      company: companyData.company,
      quarter,
      quarterNumber,
      actualEarning: Number(actualEarning),
      estimatedEarning: Number(estimatedEarning),
    });
    quarterNumber += 1;
  }
  allEarnings.push(companyEarnings);
  return allEarnings;
}

// let convertToCsv = (string) => {
//   console.log(string);
//   let convertData = JSON.parse(string);
//   let csvString = 'ticker,company,quarter,quarternumber,actualEarning,estimatedEarning\n';
//   // let csvString = '';
//   for (let i = 0; i < convertData.length; i++) {
//     csvString += convertData[i].values().join() + '\n';
//   }
//   fs.writeFileSync(csvFile, csvString);
// }

let convertToCsv = (array) => {
  let csvString = '';
  for (let i = 0; i < array.length; i++) {
    csvString += Object.values(array[i]).join() + '\n';
  }
  return csvString;
}

let writeOneMillionTimes = (writer, encoding, callback) => {
  let i = 10000000;
  write = () => {
    let ok = true;
    do {
      let data = convertToCsv(generation()[10000000 - i]);
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

writeOneMillionTimes(file, () => console.log('drain'));
 
// convertToCsv(fs.readFileSync('./DataGen'))