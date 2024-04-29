const { Router } = require('express');

const productController = require('../controllers/productController');
const cartController = require('../controllers/cartController');
const orderController = require('../controllers/orderController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = Router();

router.post('/product', productController.add_product); // TODO::for admin only
router.get('/product', productController.get_product);
// router.post('/product/id', authController.product_update);  // TODO:: for admin make this api to update in_stock variable
 
router.get('/get-cart', requireAuth, cartController.get_cart);

//orders
router.post('/order', requireAuth, orderController.place_order);

module.exports = router;
