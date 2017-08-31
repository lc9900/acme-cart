const Sequelize = require('sequelize');
var dbConnection = process.env.DATABASE_URL || 'postgres://localhost/acmecart_db';
const db = new Sequelize(dbConnection, {logging: false});

module.exports = db;
