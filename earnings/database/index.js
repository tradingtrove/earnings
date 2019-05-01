require('dotenv').config();

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  process.env.DATABASE_URI,
  {
    dialect: 'postgres',
    // timestamps: false,
    logging: false,
  },);
const Earnings = require('./Earning/postgreSeed.js');

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const getEarning = (id) => {
  return Earnings.findAll({
    attributes: ['id', 'ticker', 'company', 'quarter', 'quarternumber', 'actualearning', 'estimatedearning'],
    where: {
      ticker: id,
    }
  }) 
};

const postEarning = (data) => {
  return Earnings.create({
    ticker: data.ticker,
    company: data.company,
    quarter: data.quarter,
    quarternumber: data.quarter_number,
    actualearning: data.actual_earning,
    estimatedearning: data.estimated_earning,
  },
  { fields: [ 'ticker','company','quarter','quarter_number','actual_earning','estimated_earning' ]
  }) 
};

module.exports = sequelize;
module.exports.getEarning = getEarning;
module.exports.postEarning = postEarning;
