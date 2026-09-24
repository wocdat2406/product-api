const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ quiet: true });
const productRoutes = require("./routes/productRoutes");
const app = express();

// Cho phép server nhận dữ liệu JSON
app.use(express.json());
app.use("/api/products", productRoutes);

// Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });

// Route kiểm tra server
app.get("/", (req, res) => {
    res.send("Product API is running");
});

// Healthcheck
app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK" });
});

// Lấy PORT từ file .env
const PORT = process.env.PORT || 3000;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;