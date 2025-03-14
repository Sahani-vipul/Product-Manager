const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// // Register User
// exports.register = async (req, res) => {
//     try {
//         const { username, email, phone, password } = req.body;
//         const user = new User({ username, email, phone, password });
//         await user.save();
//         res.status(201).json({ message: "User registered successfully" });
//     } catch (error) {
//         res.status(400).json({ error: "Registration failed", details: error });
//     }
// };

// Register User
exports.register = async (req, res) => {
    try {
        console.log("Incoming request body:", req.body); // Debugging log

        const { username, email, phone, password } = req.body;

        // Validate input fields
        if (!username || !email || !phone || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if email or phone already exists (optional)
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already registered" });
        }

        // Create and save the user
        const user = new User({ username, email, phone, password });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error during registration:", error); // Debugging log
        res.status(500).json({ error: "Registration failed", details: error.message });
    }
};

// // Login User
// exports.login = async (req, res) => {
//     try {
//         const { identifier, password } = req.body;
//         const user = await User.findOne({
//             $or: [{ username: identifier }, { email: identifier }]
//         });

//         if (!user || !(await bcrypt.compare(password, user.password))) {
//             return res.status(401).json({ error: "Invalid credentials" });
//         }

//         const token = jwt.sign({ userId: user._id }, "your_jwt_secret", { expiresIn: "1h" });
//         res.json({ message: "Login successful", token });
//     } catch (error) {
//         res.status(500).json({ error: "Login failed", details: error });
//     }
// };

// Login User
exports.login = async (req, res) => {
    try {
        console.log("Received login request:", req.body); // Debugging log

        const { identifier, password } = req.body;
        const user = await User.findOne({
            $or: [{ username: identifier }, { email: identifier }]
        });

        if (!user) {
            console.log("User not found");
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            console.log("Incorrect password");
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, "your_jwt_secret", { expiresIn: "1h" });
        res.json({ message: "Login successful", token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Login failed", details: error.message });
    }
};
