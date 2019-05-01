const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  process.env.DATABASE_URI,
  {
    dialect: 'postgres',
    // timestamps: false,
    logging: false,
  },
  );

const Earnings = sequelize.define('earnings', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
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
  );

module.exports = Earnings;
