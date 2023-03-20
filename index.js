// Imports
const express = require("express");
const expressLayouts = require("express-ejs-layouts");

// Create an express application
const app = express();

// Set the default port to listen on
const PORT = process.env.PORT || 8000;

// Define the route for the root path ("/") and send the response
app.get("/", (req, res) => {
  res.send("Hey daar!");
});

// Start the server and listen for incoming connections on the specified port
app.listen(PORT, () => console.info(`App listening on port ${PORT}`));
