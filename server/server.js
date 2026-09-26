const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const hotelRoutes = require("./hotelRoutes");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Make uploaded images accessible
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// Hotel API routes
app.use("/api/hotels", hotelRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Hotel CRUD API is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});