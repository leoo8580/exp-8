// seed.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    await Product.deleteMany(); // clear existing data

    const sampleProducts = [
      { name: "Apple", category: "Fruits", price: 120 },
      { name: "Banana", category: "Fruits", price: 60 },
      { name: "Tomato", category: "Vegetables", price: 40 },
      { name: "Potato", category: "Vegetables", price: 30 },
      { name: "Milk", category: "Dairy", price: 50 },
      { name: "Bread", category: "Bakery", price: 45 },
    ];

    await Product.insertMany(sampleProducts);
    console.log("🍎 Sample products inserted!");
    process.exit();
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
