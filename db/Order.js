const db = require('./conn.js');
const Sequelize = db.Sequelize;

const Order = db.define('order', {
    isCart: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    address: Sequelize.STRING
})

module.exports = Order;
