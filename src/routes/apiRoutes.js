const { Router } = require('express');

const productController = require('../controllers/productController');

const router = Router();

router.post('/product', productController.add_product); // TODO::for admin only
router.get('/product', productController.get_product);
// router.post('/product/id', authController.product_update);  // TODO:: for admin make this api to update in_stock variable
 
module.exports = router;
