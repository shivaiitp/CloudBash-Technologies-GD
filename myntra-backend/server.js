const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend requests
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    methods: ["GET", "POST"],
  })
);
app.options("*", cors()); // Handle preflight requests

// API Endpoint to fetch product recommendations
app.get("/api/recommendations/:productId", async (req, res) => {
  const productId = req.params.productId;

  // Validate product ID
  if (!productId) {
    return res.status(400).json({ error: "Product ID is required" });
  }

  const apiUrl = `https://www.myntra.com/gateway/v2/product/${productId}/related`;

  try {
    console.log(`Fetching recommendations for product ID: ${productId}`);

    // Fetch data from Myntra's API
    const response = await axios.get(apiUrl);

    // Respond with the data
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching recommendations:", error.message);

    // Handle different error scenarios
    if (error.response) {
      // API returned an error
      res.status(error.response.status).json({
        error: `API error: ${error.response.data.message || "Unknown error"}`,
      });
    } else if (error.request) {
      // No response from API
      res.status(500).json({ error: "No response from API" });
    } else {
      // Other errors
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
