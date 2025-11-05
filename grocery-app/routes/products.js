import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// 🟢 Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// 🟢 Add new product
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json({ message: "Product added successfully", newProduct });
  } catch (error) {
    res.status(500).json({ error: "Failed to add product" });
  }
});

export default router;
