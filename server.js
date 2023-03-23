// Imports
const express = require("express");
const ejs = require("ejs");
const routes = require("./routes/routes");

// Create an express application
const app = express();

// Set the default port to listen on
const PORT = process.env.PORT || 8000;

// Middleware

// Serve static files from the 'public' folder
app.use(express.static("./public"));

// Serve the 'public/dist' folder as static content under the '/dist' path
app.use('/dist', express.static('public/dist'));

// Configure view engine
app.set("view engine", "ejs");

// Register routes
app.use(routes);

// Start the server and listen for incoming connections on the specified port
app.listen(PORT, () => console.info(`App listening on port ${PORT}`));
