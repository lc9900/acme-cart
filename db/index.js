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
    let resultView = {
        productSection: {
            orderId: '', // This is the id of the cart
            products: [] // This is a list of product objects for ALL products
        },
        cart: {
            orderId: '',
            lineItems: [] // This is all lineItems in the car, and its product
        },
        completedOrders: []
    };

    return Order.findOne({
        where: {
            isCart: true
        },
        include: [{
            model: LineItem,
            include: [Product]
        }],
    })
    .then(result => {
        // Get the cart's orde ID
        resultView.productSection.orderId = result.id;
        resultView.cart.orderId = result.id;
        resultView.cart.lineItems = result.lineitems;
        // console.log(result.lineitems);
    })
    .then(() => {
        // Get all the products
        return Product.findAll();
    })
    .then(result => {
        resultView.productSection.products = result;
        // result.forEach((product) => {
        //     resultView.productSection.products.push(product.get({plain: true}));
        // })
    })
    .then(() => {
        return Order.findAll({
            where: {
                isCart: false
            },
            include: [{
                model: LineItem,
                include: [Product]
            }],
        });
    })
    .then(orders => {
        resultView.completedOrders = orders;
    })
    .then(() => {
        return resultView;
    })
}

module.exports = {
    syncAndSeed, generateView
}
