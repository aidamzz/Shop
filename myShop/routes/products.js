const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// POST route to add a new product
router.post('/', async (req, res) => {
    const { title, description, price, sizes, colors, pictures, userId } = req.body;
    try {
        const newProduct = new Product({
            user: userId,
            title,
            description,
            price,
            sizes,
            colors,
            pictures
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// GET route to find a single product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// GET route to find all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// PUT route to update a product by ID
router.put('/:id', async (req, res) => {
    const { title, description, price, sizes, colors, pictures } = req.body;
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Update fields if they have a new value
        product.title = title || product.title;
        product.description = description || product.description;
        product.price = price || product.price;
        product.sizes = sizes || product.sizes;
        product.colors = colors || product.colors;
        product.pictures = pictures || product.pictures;

        await product.save();
        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// DELETE route to delete a product by ID
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
