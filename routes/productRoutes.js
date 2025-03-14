const express = require("express");
const { createProduct, getProducts, updateProduct, deleteProduct } = require("../controllers/productController");

const router = express.Router();

router.post("/addProduct", createProduct);
router.get("/getProduct", getProducts);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
