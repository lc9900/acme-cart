const db = require('./conn.js');
const Sequelize = db.Sequelize;

const Product = db.define('product', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Product;
