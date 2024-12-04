const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend requests
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend's URL
    methods: ["GET"],
  })
);

// Widget configurations
const widgets = {
  myntra: {
    apiUrl: (productId) =>
      `https://www.myntra.com/gateway/v2/product/${productId}/related`,
    uiConfig: { theme: "dark", size: "medium" },
  },
  meesho: {
    apiUrl: (productId) =>
      `https://www.meesho.com/api/v1/productRecommendation/${productId}`,
    uiConfig: { theme: "light", size: "small" },
  },
};

// API endpoint for widgets
app.get("/api/widget/:widgetId", async (req, res) => {
  const { widgetId } = req.params;
  const { productId } = req.query; // Query param for product ID

  if (!widgets[widgetId]) {
    return res.status(404).json({ error: "Widget not found" });
  }

  if (!productId) {
    return res.status(400).json({ error: "Product ID is required" });
  }

  const widgetConfig = widgets[widgetId];
  const apiUrl = widgetConfig.apiUrl(productId);

  try {
    // Fetch recommendations from the respective API
    const response = await axios.get(apiUrl);

    // Return data along with UI configuration
    res.json({ data: response.data, uiConfig: widgetConfig.uiConfig });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
