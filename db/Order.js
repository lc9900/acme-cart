const db = require('./conn.js');
const Sequelize = db.Sequelize;
const utils = require('../utils');

const Order = db.define('order', {
    isCart: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    address: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            notEmpty: true
        }
    }
});

// Place Order
// orderContent -- { isCart: false, address: 'string here'}
// Once order is placed, then the order is no longer a cart, thus isCart is false
Order.updateFromRequestBody = function (orderId, orderContent) {
    // Update order to isCart to false.
    // Create a new order with isCart: true
    console.log(orderContent);

    return Order.findOne({
        where: {
            id: orderId
        }
    }).then(order => {
        return order.update(orderContent);
    })
    .then(() => {
        return Order.create({});
    })
    .catch(err => {
        if(err.message.includes('notEmpty')) throw new TypeError('address required');
        else throw err;
    })
}

// Add to cart
Order.addProductToCart = function (productId, orderId) {
    return db.models.lineitem.findOrCreate({
        where: {
            productId: productId,
            orderId: orderId
        }
    })
    .then(([lineitem, created]) => {
        if(created) {
            console.log("Created =======================");
            return lineitem;
        }
        else {
            console.log("Already there ===============");
            lineitem.quantity++;
            return lineitem.save();
        }
    });
}

// Remove from cart
Order.destroyLineItem = function (lineItemId) {
    return db.models.lineitem.destroy({
        where: {
            id: lineItemId
        }
    })

}
module.exports = Order;
