const faker = require('faker');
const fs = require('fs');

const file = fs.createWriteStream('./DataGen.csv');

const allQuarters = ['Q4 2017', 'Q1 2018', 'Q2 2018', 'Q3 2018', 'Q4 2018', 'Q1 2019', 'Q2 2019'];
let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

let generation = () => {
  // let allEarnings = [];
  // let companyData = [];
  let companyEarnings;
  let actualEarning;
  let estimatedEarning;
  let quarterNumber;
  let range;
  let estimateRange;
  ((length, limit) => {
    alphabet = alphabet.split('');
    let counter = 0;
    let result;
    let recurse = (string) => {
      if (counter === limit) {
        return;
      }
      if (string.length === length) {
        counter++;
        const company = {
          ticker: string,
          company: faker.company.companyName().replace(/[,]/, ''),
        }
        
        companyEarnings = [];
        actualEarning = Math.random() * 7;
        quarterNumber = 0;
        for (const quarter of allQuarters) {
          range = Math.floor(Math.random() * 100);
          range *= Math.floor(Math.random() * 2) === 1 ? 0.45 : -0.40;
          actualEarning *= (1 + range / 100);
          actualEarning = actualEarning.toFixed(2);

          estimateRange = Math.floor(Math.random() * 100);
          estimateRange *= Math.floor(Math.random() * 2) === 1 ? 0.10 : -0.10;
          estimatedEarning = actualEarning * (1 + estimateRange / 100);
          estimatedEarning = estimatedEarning.toFixed(2);

          companyEarnings.push(`${company.ticker},${company.company},${quarter},${quarterNumber},${actualEarning},${estimatedEarning}\n`);
          quarterNumber += 1;
        }
        result = companyEarnings.join('');
        writeOneMillionTimes(file, result);
        return;
      }
      alphabet.forEach( (letter) => {
        recurse(string + letter);
      });
    }
    recurse('');
  })(5, 10000000);
}


let writeOneMillionTimes = (writer, data, encoding, callback) => {
  let i = 1;
  write = () => {
    if (i % 100 === 0) {
      console.error(i * 1000);
    }
    let ok = true;
    do {
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

generation();
 