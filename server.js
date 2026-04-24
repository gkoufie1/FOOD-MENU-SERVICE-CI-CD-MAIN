const express = require("express");
const path = require("node:path");

const app = express();
const PORT = process.env.PORT || 3000;
const APP_VERSION = process.env.APP_VERSION || "v1.0";

const menu = [
  { id: 1, name: "Margherita Pizza", price: 299 },
  { id: 2, name: "Veg Burger", price: 149 },
  { id: 3, name: "Pasta Alfredo", price: 249 },
  { id: 4, name: "French Fries", price: 99 }
];

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/menu", (req, res) => {
  res.json(menu);
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

app.get("/version", (req, res) => {
  res.json({ version: APP_VERSION });
});

if (require.main === module) {
  const server = app.listen(PORT, () => {
    console.log(`Food Menu Service running on port ${PORT}`);
  });

  process.on("SIGTERM", () => {
    server.close(() => process.exit(0));
  });
}

module.exports = app;
