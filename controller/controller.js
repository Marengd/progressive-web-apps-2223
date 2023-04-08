const api = require("../api/api");

const index = async (req, res) => {
  try {
    const quotes = await api.fetchQuotes();

    const sortedQuotes = quotes.sort((a, b) => a.quote.localeCompare(b.quote));

    const groupedQuotes = {};

    for (const { quote, index } of sortedQuotes) {
      const letter = quote[0].toUpperCase();

      if (!groupedQuotes[letter]) {
        groupedQuotes[letter] = [];
      }

      groupedQuotes[letter].push({ quote, index });
    }

    res.render("pages/index", { groupedQuotes });
  } catch (err) {
    throw new Error(err);
  }
};

const generator = async (req, res) => {
  try {
    const quote = await api.get("detail");
    res.render("pages/generator", { quote });
  } catch (err) {
    throw new Error(err);
  }
};

const quoteDetail = async (req, res) => {
  try {
    const index = req.params.index;
    const quotes = await api.fetchQuotes();
    const quote = quotes[index].quote;

    res.render("pages/quote-detail", { quote });
  } catch (err) {
    throw new Error(err);
  }
};

const offline = (req, res) => {
  res.render("pages/offline");
};

module.exports = {
  index,
  generator,
  quoteDetail,
  offline,
};
