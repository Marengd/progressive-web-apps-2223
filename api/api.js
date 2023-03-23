// Import the fetch function from the "cross-fetch" library.
const { default: fetch } = require("cross-fetch");

// Import the "endpoint" function from the local "endpoint" module.
const endpoint = require("./endpoint");

// Define an "Api" class.
class Api {
  // Define an asynchronous "get" method that takes a "type" parameter and an optional "index" parameter.
  async get(type, index) {
    try {
      // Fetch data from the specified endpoint and await its response.
      const response = await fetch(endpoint(type, index));

      // Switch on the response status.
      switch (response.status) {
        case 200:
          // If the status is 200, parse the JSON response and return it.
          return await response.json();
        case 404:
          // If the status is 404, do nothing and exit the switch statement.
          break;
      }
    } catch (err) {
      // If an error occurs, return the error.
      return err;
    }
  }
}

// Create a new instance of the "Api" class.
const api = new Api();

// Export the "api" instance as the module's default export.
module.exports = api;
