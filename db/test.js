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
    // So our order can have at least one item in it
    .then(() => {
        // Adding products to cart
        // Order.addProductToCart(productId, orderId)
        utils.inform('================== Add to Cart ==================');
        return Order.addProductToCart(1, 1);
    })
    .then(() => {
        utils.inform('================== Place Order ==================');
        // Order.updateFromRequestBody (orderId, orderContent)

        // Tested right error output
        // return Order.updateFromRequestBody(1, {isCart: false, address: ""});

        // Tested valid address
        return Order.updateFromRequestBody(1, {isCart: false, address: "New York"});
    })
    // In order to test generateView, I need to put a product in the cart
    .then(() => {
        // Adding products to cart
        // Order.addProductToCart(productId, orderId)
        utils.inform('================== Add to Cart ==================');
        return Order.addProductToCart(1, 2);
    })
    .then(() => {
        // Adding products to cart
        // Order.addProductToCart(productId, orderId)
        utils.inform('================== Add to Cart ==================');
        return Order.addProductToCart(1, 2);
    })
    .then(() => {
        // Testing generateView
        utils.inform('================== Generating View ==================');
        return db.generateView();
    })
    .then(result => {
        console.log(result.productSection.products);
        console.log(` Cart ID ${result.cart.orderId}`);
        // console.log(result.cart.lineItems);
        result.cart.lineItems.forEach((lineItem) => {
            console.log(`Product ${lineItem.product.name} with quantity of ${lineItem.quantity}`);
        })

        // Completed Orders
        result.completedOrders.forEach(item => {
            console.log(item.get({plain: true}));
            console.log(item.lineitems[0].product.name)
        })
    })
    .catch(err => {
        utils.alert('================== Outter Catch ==================');
        console.log(err.message)
    });
