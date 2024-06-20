const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');
const upload = require('../middleware/multerConfig'); // Ensure the correct path to your multerConfig file

// Create a new product with image upload
router.post('/', auth, upload.array('pictures', 5), productController.createProduct);

// Other routes...
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', auth, productController.updateProduct);
router.delete('/:id', auth, productController.deleteProduct);

module.exports = router;
