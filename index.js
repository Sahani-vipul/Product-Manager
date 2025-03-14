// const express = require("express");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");
// const authRoutes = require("./routes/authRoutes");
// const productRoutes = require("./routes/productRoutes");

// dotenv.config();
// connectDB();

// const app = express();
// app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/products", productRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // ✅ Import CORS
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");


dotenv.config();
connectDB();

const app = express();

// ✅ Enable CORS
app.use(cors({ origin: "*" })); // Allows all origins
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);


const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
app.listen(5000, "0.0.0.0", () => console.log("Server running on port 5000"));
