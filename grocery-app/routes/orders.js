const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Fetch all orders
router.get("/", async (req, res) => {
  const orders = await Order.find().populate("products");
  res.json(orders);
});

// Add a new order
router.post("/", async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.json({ message: "Order placed successfully", order });
});

// Delete an order
router.delete("/:id", async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: "Order deleted successfully" });
});

module.exports = router;
