// Imports
const express = require("express");

// Create an express application
const app = express();

// Set the default port to listen on
const PORT = process.env.PORT || 8000;

let ejs = require("ejs");

const routes = require("./routes/routes");

// Middleware
app.use(express.static("./public"));

// Setting View engine
app.set("view engine", "ejs");


// Define the route for the root path ("/") and send the response
app.use(routes)

// Start the server and listen for incoming connections on the specified port
app.listen(PORT, () => console.info(`App listening on port ${PORT}`));

