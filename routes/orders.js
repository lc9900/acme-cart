const router = require('express').Router();
const Order = require('./db/Order');

module.exports = router;


// const { Order } = require('../db').models;
// const app = require('express').Router();

// module.exports = app;


// Place Order
router.put('/:id', (req, res, next)=> {
  Order.updateFromRequestBody(req.params.id*1, req.body)
    .then( () => res.redirect('/'))
    .catch(ex => {
      if(ex.message === 'address required'){
        return res.render('index', { error: ex });
      }
      next(ex);
    });
});


// Add to cart
router.post('/:id/lineItems', (req, res, next)=> {
  Order.addProductToCart(req.body.productId*1, req.params.id*1)
    .then( ()=> res.redirect('/'))
    .catch(next);
});


// Remove from cart
router.delete('/:orderId/lineItems/:id', (req, res, next)=> {
  Order.destroyLineItem(req.params.id*1)
    .then( ()=> res.redirect('/'))
    .catch(next);
});
