const db = require('./index');
const Order = require('./Order');
const utils = require('../utils')

db.syncAndSeed()
    .then(() => {
        // Adding products to cart
        // Order.addProductToCart(productId, orderId)
        utils.inform('================== Add to Cart ==================');
        return Order.addProductToCart(1, 1);
    })
    .then(lineitem => {
        // console.log(lineitem);
        return Order.addProductToCart(1, 1);
    })
    .then(lineitem => {
        // console.log(lineitem.get({plain: true}));
        console.log(lineitem.quantity);
    })
    .then(() => {
        utils.inform('================== Remove from Cart ==================');
        // Order.destroyLineItem (lineItemId)
        return Order.destroyLineItem(1);
    })
    .then(() => {
        utils.inform('================== Place Order ==================');
        // Order.updateFromRequestBody (orderId, orderContent)

        // Tested right error output
        // return Order.updateFromRequestBody(1, {isCart: false, address: ""});

        // Tested valid address
        return Order.updateFromRequestBody(1, {isCart: false, address: "New York"});
    })
    .catch(err => {
        utils.alert('================== Outter Catch ==================');
        console.log(err.message)
    });
