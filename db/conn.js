const Sequelize = require('sequelize');
var dbConnection = process.env.DATABASE_URL || 'postgres://localhost/acmecart_db';
const db = new Sequelize(dbConnection);

module.exports = db;
