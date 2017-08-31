const db = require('./conn.js');
const Sequelize = db.Sequelize;
const utils = require('../utils');
const Product = require('./Product');
const Order = require('./Order');
const LineItem = require('./LineItem');

LineItem.belongsTo(Order);
LineItem.belongsTo(Product);
// Order.hasMany(Product);
Order.hasMany(LineItem);

function syncAndSeed () {
    return db.sync({force:true})
            .then(() => {
                utils.inform('Database Synced');
                return Product.create({name: 'Product A'});
            }).then(() => {
                return Product.create({name: 'Product B'});
            }).then(() => {
                return Product.create({name: 'Product C'});
            }).then(() => {
                return Order.create({});
            })
            .then(() => {
                utils.inform('Database Seeded');
            })
            .catch( err => {
                throw err;
            })
}

// Product section -- order.id(isCart: true), Product Name and Product id of each available product
// Your Cart -- Product Name, lineitem quantity, lineitem.id, order.id(isCart: true).
// Your Order -- All Orders -- order.id(isCart: false), order.address, product.name, lineitem quantity
function generateView() {

}

module.exports = {
    syncAndSeed
}
