const Product = require('../models/Product');

// Handle creating a new product
exports.createProduct = async (req, res) => {
    const { title, description, price, sizes, colors, userId } = req.body;

    try {
        // Check if userId is provided and valid
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const newProduct = new Product({
            user: userId,
            title,
            description,
            price,
            sizes,
            colors,
            pictures: req.files  ? req.files.map(file => file.path) : []
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating product', error: err.message });
    }
};


// Handle fetching all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching products', error: err.message });
    }
};

// Handle fetching a single product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching product', error: err.message });
    }
};

// Handle updating a product by ID
exports.updateProduct = async (req, res) => {
    const { title, description, price, sizes, colors, pictures } = req.body;
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, {
            title,
            description,
            price,
            sizes,
            colors,
            pictures
        }, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating product', error: err.message });
    }
};

// Handle deleting a product by ID
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting product', error: err.message });
    }
};
