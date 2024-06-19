const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middleware/multerConfig');

router.post('/', upload.array('productImage', 5), productController.createProduct); // Adjust '5' to the maximum number of images allowed

// Route configurations using controller functions
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
