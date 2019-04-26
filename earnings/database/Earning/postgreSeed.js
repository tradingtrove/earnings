const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
  },);

const Earnings = sequelize.define('earnings', {
  ticker: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  company: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  quarter: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  quarternumber: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  actualearning: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  estimatedearning: {
    type: Sequelize.FLOAT,
    allowNull: false,
  }
  },
  {
    timestamps: false,
  });

module.exports = Earnings;
