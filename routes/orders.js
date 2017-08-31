const router = require('express').Router();
const Order = require('../db/Order');
const db = require('../db');
module.exports = router;


// Place Order
router.put('/:id', (req, res, next)=> {
  Order.updateFromRequestBody(req.params.id*1, req.body)
    .then( () => res.redirect('/'))
    .catch(ex => {
        // console.log('In put catch');
        // console.log(ex.message)
      if(ex.message === 'address required'){
        // console.log('inside the if')
        // return res.render('index', { error: ex });
        // return res.redirect('/')
        // return res.render('index', {});
        return db.generateView()
                .then((resultView) => {
                    resultView.error = ex.message;
                    res.render('index', resultView);
                }).catch(next);
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
