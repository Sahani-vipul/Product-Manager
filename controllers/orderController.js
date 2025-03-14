const Order = require("../models/orderModel");
const Product = require("../models/productModel");

// // Create Order
// exports.createOrder = async (req, res) => {
//     try {
//         const { products } = req.body;
//         let totalAmount = 0;

//         // Calculate total amount and validate products
//         for (const item of products) {
//             const product = await Product.findById(item.product);
//             if (!product) return res.status(404).json({ error: "Product not found" });

//             totalAmount += product.price * item.quantity;
//         }

//         const order = new Order({ user: req.user.userId, products, totalAmount });
//         await order.save();

//         res.status(201).json({ message: "Order placed successfully", order });
//     } catch (error) {
//         res.status(400).json({ error: "Order creation failed", details: error });
//     }
// };

exports.createOrder = async (req, res) => {
    try {
        console.log("Received Order Request:", req.body); // Debugging

        const { products } = req.body;
        if (!products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: "Invalid products array" });
        }

        let totalAmount = 0;
        for (const item of products) {
            if (!item.product || !item.quantity) {
                return res.status(400).json({ error: "Product ID and quantity are required" });
            }

            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(404).json({ error: `Product not found: ${item.product}` });
            }

            totalAmount += product.price * item.quantity;
        }

        const order = new Order({ user: req.user.userId, products, totalAmount });
        await order.save();

        res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
        console.error("Order creation failed:", error);
        res.status(400).json({ error: "Order creation failed", details: error.message });
    }
};

// Get All Orders (Admin or User)
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.userId }).populate("products.product");
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: "Fetching orders failed", details: error });
    }
};

// Get Single Order by ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("products.product");
        if (!order) return res.status(404).json({ error: "Order not found" });

        res.json(order);
    } catch (error) {
        res.status(500).json({ error: "Fetching order failed", details: error });
    }
};

// Update Order Status (Admin Only)
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });

        if (!order) return res.status(404).json({ error: "Order not found" });

        res.json({ message: "Order status updated", order });
    } catch (error) {
        res.status(400).json({ error: "Update failed", details: error });
    }
};

// Delete Order
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) return res.status(404).json({ error: "Order not found" });

        res.json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: "Deletion failed", details: error });
    }
};
