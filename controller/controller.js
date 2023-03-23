// Import the API module
const api = require("../api/api");

// Render the index page with all the quotes from the API, sorted and grouped alphabetically
const index = async (req, res) => {
  try {
    const quotes = await api.get("all");

    // Sort quotes alphabetically
    quotes.sort();

    // Group quotes by the first letter
    const groupedQuotes = quotes.reduce((acc, quote) => {
      const firstLetter = quote[0].toUpperCase();
      acc[firstLetter] = acc[firstLetter] || [];
      acc[firstLetter].push(quote);
      return acc;
    }, {});

    // Render the 'pages/index' template with the grouped quotes
    res.render("pages/index", { groupedQuotes });
  } catch (err) {
    throw new Error(err);
  }
};

// Render the generator page with a random quote from the API
const generator = async (req, res) => {
  try {
    const quote = await api.get("detail");

    res.render("pages/generator", { quote });
  } catch (err) {
    throw new Error(err);
  }
};

// Render the quote detail page with a specific quote from the API
const quoteDetail = async (req, res) => {
  try {
    const index = req.params.index;
    const quotes = await api.get("all");
    const quote = quotes[index];

    // Render the 'pages/quote-detail' template with the fetched quote
    res.render("pages/quote-detail", { quote });
  } catch (err) {
    throw new Error(err);
  }
};

// Export the controller functions
module.exports = {
  index,
  generator,
  quoteDetail,
};
