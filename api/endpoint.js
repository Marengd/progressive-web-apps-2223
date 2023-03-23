// Define a function "endpoint" that takes a "type" parameter and an optional "index" parameter.
const endpoint = (type, index) => {
  // Use a switch statement instead of if-else for better readability and easier future expansion.
  switch (type) {
    case 'detail':
      // Return the Kanye Rest API URL for the "detail" type.
      return 'https://api.kanye.rest';

    case 'all':
      // Return the custom URL for the "all" type.
      return 'https://raw.githubusercontent.com/ajzbc/kanye.rest/master/quotes.json';

    case 'quote-detail':
      // Return the custom URL for the "quote-detail" type with an added index parameter.
      return `https://raw.githubusercontent.com/ajzbc/kanye.rest/master/quotes.json?index=${index}`;

    default:
      // Handle unknown types by returning an empty string or an error message.
      return '';
  }
};

// Export the "endpoint" function as the module's default export.
module.exports = endpoint;