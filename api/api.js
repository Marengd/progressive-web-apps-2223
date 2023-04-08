const { default: fetch } = require("cross-fetch");
const endpoint = require("./endpoint");

class Api {
  async get(type, index) {
    try {
      const response = await fetch(endpoint(type, index));

      switch (response.status) {
        case 200:
          return await response.json();
        case 404:
          break;
      }
    } catch (err) {
      return err;
    }
  }

  async fetchQuotes() {
    const response = await fetch('https://raw.githubusercontent.com/ajzbc/kanye.rest/master/quotes.json');
    const quotes = await response.json();
  
    return quotes.map((quote, index) => ({
      quote,
      index,
    }));
  }
}

const api = new Api();
module.exports = api;
