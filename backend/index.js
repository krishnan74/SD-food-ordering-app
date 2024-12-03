const express = require("express");
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables

// Initialize the Express app
const app = express();
const port = process.env.PORT || 5000; // Use env variable for port

// CORS configuration
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

// Load food data from the database and make it globally available
global.foodData = null;
global.foodCategory = null;

require("./db")(function call(err, data, categoryData) {
  if (err) {
    console.error("Failed to load data:", err);
    process.exit(1); // Exit the process if data loading fails
  }

  global.foodData = data;
  global.foodCategory = categoryData;

  // Once the data is loaded, start the server
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", require("./Routes/Auth"));
