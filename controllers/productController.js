const Product = require("../models/productModel");

// // Create Product
// exports.createProduct = async (req, res) => {
//     try {
//         const product = new Product(req.body);
//         await product.save();
//         res.status(201).json({ message: "Product created successfully", product });
//     } catch (error) {
//         res.status(400).json({ error: "Product creation failed", details: error });
//     }
// };

// Create Product
exports.createProduct = async (req, res) => {
    try {
        const { productName, price, description, category, quantity } = req.body;

        // Validate required fields
        if (!productName || !price || !quantity) {
            return res.status(400).json({ error: "Product name, price, and quantity are required." });
        }

        // Ensure numeric fields are valid
        if (isNaN(price) || isNaN(quantity)) {
            return res.status(400).json({ error: "Price and quantity must be valid numbers." });
        }

        // Create new product
        const product = new Product({
            name: productName,
            price: Number(price), // Convert to number
            description,
            category,
            stock: Number(quantity) // Convert to number
        });

        await product.save();
        res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        res.status(400).json({ error: "Product creation failed", details: error.message });
    }
};

// Get All Products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Fetching products failed", details: error });
    }
};

// Update Product
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: "Product updated successfully", product });
    } catch (error) {
        res.status(400).json({ error: "Update failed", details: error });
    }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: "Deletion failed", details: error });
    }
};
