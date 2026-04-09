const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const FILE = "orders.json";

// 👉 Load existing orders from file
let orders = {};

if (fs.existsSync(FILE)) {
  const data = fs.readFileSync(FILE);
  orders = JSON.parse(data);
}

// 👉 Save orders to file
function saveOrders() {
  fs.writeFileSync(FILE, JSON.stringify(orders, null, 2));
}


// ➤ Add order
app.post("/order", (req, res) => {
  const { name } = req.body;

  console.log("👉 Received:", name);   // ADD THIS

  orders[name] = (orders[name] || 0) + 1;

  console.log("👉 Orders now:", orders);  // ADD THIS

  res.json({ name, count: orders[name] });
});


// ➤ Get all orders
app.get("/orders", (req, res) => {
  res.json(orders);
});


// ➤ Clear all orders
app.delete("/orders", (req, res) => {
  orders = {};
  saveOrders(); // ✅ update file

  res.json({
    success: true,
    message: "Orders cleared"
  });
});


// ➤ Start server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} 🚀`);
});