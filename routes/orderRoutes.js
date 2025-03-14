const express = require("express");
const { createOrder, getOrders, getOrderById, updateOrderStatus, deleteOrder } = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/createOrder", authMiddleware, createOrder);
router.get("/getOrder", authMiddleware, getOrders);
router.get("/getOrderById/:id", authMiddleware, getOrderById);
router.put("/updateOrderStatus/:id", authMiddleware, updateOrderStatus);
router.delete("/deleteOrder/:id", authMiddleware, deleteOrder);

module.exports = router;
