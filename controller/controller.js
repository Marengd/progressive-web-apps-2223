// Import the API module
const api = require("../api/api");

// Render the index page with all the quotes from the API
const index = async (req, res) => {
  try {
    // Fetch all the quotes from the 'all' endpoint of the API
    const quotes = await api.get("all");

    // Render the 'pages/index' template with the fetched quotes
    res.render('pages/index', { quotes });
  } catch (err) {
    // Handle errors by throwing a new Error with the caught error
    throw new Error(err);
  }
};

// Render the generator page with a random quote from the API
const generator = async (req, res) => {
  try {
    // Fetch a quote from the 'detail' endpoint of the API
    const quote = await api.get("detail");

    // Render the 'pages/generator' template with the fetched quote
    res.render('pages/generator', { quote });
  } catch (err) {
    // Handle errors by throwing a new Error with the caught error
    throw new Error(err);
  }
};

// Export the controller functions
module.exports = {
  index,
  generator,
};
