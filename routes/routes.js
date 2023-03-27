// Import the Express library.
const express = require("express");

// Create a new Router instance from the Express library.
const router = express.Router();

// Import the controller functions from the "../controller/controller" module.
const controller = require("../controller/controller");

// Define a route for the root path ("/") that handles GET requests and calls the "index" function from the controller.
router.get("/", controller.index);

// Define a route for the "/generator" path that handles GET requests and calls the "generator" function from the controller.
router.get("/generator", controller.generator);

// Add a new route for the quote detail page
router.get("/quote-detail/:index", controller.quoteDetail);

// Add a new route for the offline page
router.get("/offline", controller.offline);

// Export the router instance as the module's default export.
module.exports = router;
