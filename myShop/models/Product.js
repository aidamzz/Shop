const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    sizes: [String],  // Array of sizes
    colors: [String],  // Array of colors
    pictures: [String]  // Array of URLs for pictures
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
