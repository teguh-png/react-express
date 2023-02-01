const router = require('express').Router();
const productController = require('../controllers/ProductController');

router.get('/api/product', productController.index);
router.get('/api/product/:id', productController.view);
router.post('/api/product', productController.store);
router.put('/api/product/:id', productController.update);
router.delete('/api/product/:id', productController.destroy);

module.exports = router;
