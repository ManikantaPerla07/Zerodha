const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("✅ Connected to MongoDB");
});

// Define schema and model
const OrderSchema = new mongoose.Schema({
  name: String,
  type: String,
  quantity: Number,
  date: String,
});
const OrderModel = mongoose.model("orders", OrderSchema);

// API Routes
app.post("/newOrder", async (req, res) => {
  try {
    const newOrder = new OrderModel(req.body);
    await newOrder.save();
    res.json({ message: "Order saved successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save order." });
  }
});

app.get("/allHoldings", async (req, res) => {
  try {
    const orders = await OrderModel.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch holdings." });
  }
});

// 🔥 Serve frontend React app from dashboard/build
app.use(express.static(path.join(__dirname, "../dashboard/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dashboard/build/index.html"));
});

// Start server
const PORT = process.env.PORT || 3002;
app.listen(PORT, async () => {
  console.log(`🚀 Server running at https://localhost:${PORT}`);
});
