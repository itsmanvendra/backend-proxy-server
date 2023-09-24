const express = require("express");
const axios = require("axios"); // Install Axios with "npm install axios"

const app = express();
const port = 3000; // Set the port you want to use
// Middleware to parse JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Enable CORS (You can restrict this to specific origins if needed)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Define a route for proxying requests
app.post("/proxy", async (req, res) => {
  try {
      // Forward the request to the external API
      console.log(req.body);
    const response = await axios.post(
      "https://forms.maakeetoo.com/formapi/791",
      req.body,
      {
        headers: {
          //   Authorization: "Bearer YOUR_ACCESS_TOKEN", // Replace with your access token
          "Content-Type": "application/json",
        },
      }
      );
        console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
