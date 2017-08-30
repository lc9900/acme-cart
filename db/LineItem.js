const db = require('./conn.js');
const Sequelize = db.Sequelize;

const LineItem = db.define('lineitem', {
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    }
})


module.exports = LineItem;
